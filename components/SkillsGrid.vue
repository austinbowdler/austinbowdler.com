<script setup lang="ts">
import { ref } from 'vue'

type Skill = {
    name: string
    icon: string // URL (devicon CDN or local)
    color?: string
    category?: string
}

defineProps<{ skills: Skill[] }>()

// Track mouse position per-card for the tilt effect. Keyed by card index.
const tilts = ref<Record<number, { rx: number; ry: number; mx: number; my: number; active: boolean }>>({})

function onMove(e: MouseEvent, i: number) {
    const card = e.currentTarget as HTMLElement
    const r = card.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    const rx = (y - 0.5) * -10
    const ry = (x - 0.5) * 10
    tilts.value[i] = {
        rx,
        ry,
        mx: x * 100,
        my: y * 100,
        active: true,
    }
}

function onLeave(i: number) {
    tilts.value[i] = { rx: 0, ry: 0, mx: 50, my: 50, active: false }
}

function cardStyle(i: number) {
    const t = tilts.value[i]
    if (!t) return {}
    return {
        transform: `perspective(700px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) translateZ(0)`,
        '--mx': `${t.mx}%`,
        '--my': `${t.my}%`,
    } as Record<string, string>
}
</script>

<template>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div v-for="(s, i) in skills" :key="s.name" class="skill-card group" :style="cardStyle(i)"
            @mousemove="onMove($event, i)" @mouseleave="onLeave(i)"
            v-motion="{ initial: { opacity: 0, y: 16 }, visibleOnce: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 40 } } }">
            <div class="skill-glow" />
            <div class="skill-inner">
                <img :src="s.icon" :alt="s.name" loading="lazy" decoding="async" class="skill-icon" />
                <div class="skill-text">
                    <div class="skill-name">{{ s.name }}</div>
                    <div v-if="s.category" class="skill-cat">{{ s.category }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.skill-card {
    position: relative;
    border-radius: 1.25rem;
    padding: 1px;
    background: linear-gradient(140deg, rgba(148, 163, 184, 0.18), rgba(148, 163, 184, 0.05) 40%, rgba(148, 163, 184, 0) 70%);
    transition: transform 220ms cubic-bezier(.2, .8, .2, 1);
    will-change: transform;
    --mx: 50%;
    --my: 50%;
}

.skill-inner {
    position: relative;
    border-radius: calc(1.25rem - 1px);
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(8px);
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border: 1px solid rgba(148, 163, 184, 0.18);
    overflow: hidden;
    transition: background 220ms ease, border-color 220ms ease;
}


.skill-glow {
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    pointer-events: none;
    opacity: 0;
    transition: opacity 220ms ease;
    background: radial-gradient(260px circle at var(--mx) var(--my), rgba(102, 174, 191, 0.35), transparent 60%);
}

.skill-card:hover .skill-glow {
    opacity: 1;
}

.skill-card:hover .skill-inner {
    border-color: rgba(102, 174, 191, 0.5);
}

.skill-icon {
    width: 2.25rem;
    height: 2.25rem;
    object-fit: contain;
    filter: drop-shadow(0 4px 12px rgba(67, 140, 164, 0.25));
    transition: transform 220ms cubic-bezier(.2, .8, .2, 1);
}

.skill-card:hover .skill-icon {
    transform: scale(1.1) rotate(-3deg);
}

.skill-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.skill-name {
    font-weight: 600;
    color: rgb(30 41 59);
    line-height: 1.1;
}

.skill-cat {
    font-size: 0.7rem;
    color: rgb(100 116 139);
    margin-top: 2px;
}
</style>

<style>
html.dark .skill-inner {
    background: rgba(30, 41, 59, 0.55);
    border-color: rgba(148, 163, 184, 0.15);
}

html.dark .skill-name {
    color: rgb(226 232 240);
}

html.dark .skill-cat {
    color: rgb(148 163 184);
}
</style>
