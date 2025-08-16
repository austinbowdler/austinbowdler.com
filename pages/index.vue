<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { useFetch } from 'nuxt/app';
const { data: projects } = await useFetch('/api/projects')
const year = new Date().getFullYear()

// Font Awesome icons are registered globally in `plugins/fontawesome.js`.
// Here we provide the icon references used by the `font-awesome-icon` component.
import { faCode, faDatabase, faDesktop } from '@fortawesome/free-solid-svg-icons'
import { faVuejs, faJsSquare, faReact, faWindows, faHtml5, faCss3, faPython, faMicrosoft } from '@fortawesome/free-brands-svg-icons'

const skills = [
    // Using representative brand colors
    { name: 'C#', icon: faWindows, color: '#0078D6' }, // Microsoft blue
    { name: 'Vue.js', icon: faVuejs, color: '#42B883' },
    { name: 'React', icon: faReact, color: '#61DAFB' },
    { name: 'JavaScript', icon: faJsSquare, color: '#F7DF1E' },
    { name: 'jQuery', icon: faJsSquare, color: '#0769AD' },
    { name: 'T-SQL', icon: faDatabase, color: '#4479A1' },
    { name: 'Python', icon: faPython, color: '#3776AB' },
    { name: 'WPF', icon: faMicrosoft, color: '#7375C8' },
    { name: 'HTML5', icon: faHtml5, color: '#E34F26' },
    { name: 'CSS3', icon: faCss3, color: '#1572B6' }
]

// Theme switcher component
import ThemeSwitcher from '~/components/ThemeSwitcher.vue'

// Smooth scrolling handler that accounts for the sticky header height.
let _scrollAnimId: number | null = null
function cancelScrollAnim() {
    if (_scrollAnimId !== null) {
        cancelAnimationFrame(_scrollAnimId)
        _scrollAnimId = null
    }
}

function animateWindowScrollTo(targetY: number, duration = 450) {
    cancelScrollAnim()
    const startY = window.scrollY || window.pageYOffset
    const diff = targetY - startY
    if (Math.abs(diff) < 1) return
    const startTime = performance.now()

    const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    function step(now: number) {
        const elapsed = now - startTime
        const p = Math.min(1, elapsed / duration)
        const eased = ease(p)
        window.scrollTo(0, Math.round(startY + diff * eased))
        if (p < 1) {
            _scrollAnimId = requestAnimationFrame(step)
        } else {
            _scrollAnimId = null
        }
    }

    _scrollAnimId = requestAnimationFrame(step)
}

function animateScrollToHash(hash: string) {
    if (!hash || hash === '#') {
        animateWindowScrollTo(0)
        return
    }

    const id = hash.replace('#', '')
    const targetEl = document.getElementById(id)
    if (!targetEl) return

    const header = document.querySelector('header')
    const headerHeight = header ? (header as HTMLElement).offsetHeight : 0
    const rectTop = targetEl.getBoundingClientRect().top + window.scrollY
    const offset = 12 // small gap under the header
    const targetY = Math.max(rectTop - headerHeight - offset, 0)

    animateWindowScrollTo(targetY)
}

onMounted(() => {
    // Delegated click handler: catches anchors added later and prevents missed events.
    const clickHandler = (ev: MouseEvent) => {
        const target = (ev.target as Element)?.closest ? (ev.target as Element).closest('a') as HTMLAnchorElement | null : null
        if (!target) return
        const href = target.getAttribute('href')
        if (!href || !href.startsWith('#')) return

        // Allow modified clicks to open in new tab / copy link etc.
        if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return

        ev.preventDefault()
        animateScrollToHash(href)
        history.pushState(null, '', href)
    }

    document.addEventListener('click', clickHandler)

    // Handle back/forward navigation to hashes
    const popHandler = () => animateScrollToHash(location.hash)
    window.addEventListener('popstate', popHandler)

    // If the page loaded with a hash, animate to it after layout settles.
    if (location.hash) {
        // small timeout to allow images/fonts/layout to finish
        setTimeout(() => animateScrollToHash(location.hash), 50)
    }

    // Cleanup when component unmounts
    onBeforeUnmount(() => {
        document.removeEventListener('click', clickHandler)
        window.removeEventListener('popstate', popHandler)
        cancelScrollAnim()
    })
})
</script>

<template>
    <div
        class="min-h-screen bg-gradient-to-b from-white to-brand-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100">
        <!-- Nav -->
        <header
            class="sticky top-0 z-40 backdrop-blur bg-white/60 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-700/40">
            <nav class="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                <a href="#" class="font-bold">austin<span class="text-brand-500">bowdler</span></a>
                <div class="flex items-center gap-6">
                    <ul class="flex gap-6 text-sm">
                        <li><a href="#about" class="hover:text-brand-600 dark:hover:text-brand-300">About</a></li>
                        <li><a href="#projects" class="hover:text-brand-600 dark:hover:text-brand-300">Projects</a></li>
                        <li><a href="#contact" class="hover:text-brand-600 dark:hover:text-brand-300">Contact</a></li>
                    </ul>
                    <ThemeSwitcher />
                </div>
            </nav>
        </header>

        <!-- Hero -->
        <section class="mx-auto max-w-6xl px-4 py-20" id="top">
            <div v-motion="{
                initial: { opacity: 0, y: 20 },
                enter: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }" class="grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight">
                        Developer & designer crafting fast, clean, beautiful UIs.
                    </h1>
                    <p class="mt-5 text-lg text-slate-600">
                        I build performant, maintainable apps with Vue, C#, and SQL.
                    </p>
                    <div class="mt-8 flex gap-3">
                        <a href="#projects"
                            class="px-5 py-3 rounded-2xl bg-brand-500 text-white shadow-glass hover:bg-brand-600 transition">View
                            Projects</a>
                        <a href="#contact"
                            class="px-5 py-3 rounded-2xl border border-slate-300 hover:border-slate-400">Get in
                            touch</a>
                    </div>
                </div>
                <div class="relative w-56 sm:w-72 md:w-full max-w-[420px] mx-auto md:mx-0">
                    <!-- Square aspect container: uses padding-top to lock 1:1 ratio so the image always stays square -->
                    <div class="relative" style="padding-top:100%">
                        <NuxtImg src="/images/austinbowdler.jpg" alt="Austin Bowdler"
                            class="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-glass" />
                    </div>

                    <div
                        class="absolute -bottom-6 -left-6 w-28 h-28 rounded-3xl bg-brand-200 blur-2xl opacity-70 dark:opacity-0 dark:blur-none" />
                </div>
            </div>
        </section>

        <!-- About -->
        <section id="about" class="mx-auto max-w-6xl px-4 py-16">
            <div v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, delay: 0.1 } }">
                <h2 class="text-2xl font-bold">About</h2>
                <p class="mt-4 text-slate-700 leading-relaxed">
                    Technology professional that is a self starter with experience in problem solving and creating
                    enterprise level software solutions in direct support of business objectives with a history of
                    increased responsibility in application design, systems analysis, and development.
                </p>
            </div>
        </section>

        <!-- Skills -->
        <section id="skills" class="mx-auto max-w-6xl px-4 py-16">
            <div class="flex items-end justify-between">
                <h2 class="text-2xl font-bold">Skills</h2>
            </div>
            <SkillsGrid class="mt-8" :skills="skills" />
        </section>

        <!-- Projects -->
        <section id="projects" class="mx-auto max-w-6xl px-4 py-16">
            <h2 class="text-2xl font-bold">Projects</h2>
            <div class="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProjectCard v-for="p in projects" :key="p.title" :project="p" />
            </div>
        </section>

        <!-- Contact -->
        <section id="contact" class="mx-auto max-w-6xl px-4 py-16">
            <div class="rounded-3xl p-8 bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shadow-glass"
                v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, delay: 0.1 } }">
                <h2 class="text-2xl font-bold">Contact</h2>
                <p class="mt-3 text-slate-700">Open to chat about freelance, collaborations, or fun ideas.</p>
                <div class="mt-6 flex gap-4">
                    <a href="mailto:austin@austinbowdler.com"
                        class="px-5 py-3 rounded-2xl bg-brand-500 text-white shadow-glass hover:bg-brand-600 transition">Email
                        me</a>
                    <a href="https://github.com/austinbowdler" target="_blank"
                        class="px-5 py-3 rounded-2xl border">GitHub</a>
                </div>
            </div>
        </section>

        <footer class="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-500">
            © {{ year }} Austin Bowdler
        </footer>
    </div>
</template>

<style>
html {
    scroll-behavior: smooth;
}

body {
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
</style>
