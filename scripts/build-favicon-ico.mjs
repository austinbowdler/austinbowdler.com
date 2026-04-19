// Rasterizes /public/favicon.svg into a multi-size /public/favicon.ico
// Embeds PNG images inside the ICO (supported by all modern browsers).
//
// Run via: node scripts/build-favicon-ico.mjs

import sharp from 'sharp'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const svgPath = resolve(root, 'public/favicon.svg')
const outPath = resolve(root, 'public/favicon.ico')

const sizes = [16, 32, 48, 64]

const svg = await readFile(svgPath)

// Sharp with embedded CSS (prefers-color-scheme) will use the "light" branch
// by default when rendering, which is what we want for the ICO fallback.
const pngs = await Promise.all(
    sizes.map((s) =>
        sharp(svg, { density: 384 })
            .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .png()
            .toBuffer()
    )
)

// Build ICO: header (6 bytes) + N directory entries (16 bytes each) + PNG payloads
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0) // reserved
header.writeUInt16LE(1, 2) // type = 1 (icon)
header.writeUInt16LE(sizes.length, 4)

const entries = Buffer.alloc(16 * sizes.length)
let offset = 6 + entries.length
for (let i = 0; i < sizes.length; i++) {
    const s = sizes[i]
    const png = pngs[i]
    const e = i * 16
    entries.writeUInt8(s === 256 ? 0 : s, e + 0)
    entries.writeUInt8(s === 256 ? 0 : s, e + 1)
    entries.writeUInt8(0, e + 2) // color palette (0 = no palette)
    entries.writeUInt8(0, e + 3) // reserved
    entries.writeUInt16LE(1, e + 4) // color planes
    entries.writeUInt16LE(32, e + 6) // bits per pixel
    entries.writeUInt32LE(png.length, e + 8)
    entries.writeUInt32LE(offset, e + 12)
    offset += png.length
}

const ico = Buffer.concat([header, entries, ...pngs])
await writeFile(outPath, ico)
console.log(`✓ wrote ${outPath} (${sizes.join(', ')} px, ${ico.length} bytes)`)
