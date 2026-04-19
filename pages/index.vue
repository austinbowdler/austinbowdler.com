<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useFetch } from 'nuxt/app'
import ThemeSwitcher from '~/components/ThemeSwitcher.vue'
import TypedRoles from '~/components/TypedRoles.vue'
import StatCounter from '~/components/StatCounter.vue'

const { data: projects } = await useFetch('/api/projects')
const year = new Date().getFullYear()

// Devicon CDN — swap any entry's `icon` URL to change the logo shown.
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'

const skills = [
    { name: 'C#', icon: `${DEVICON}/csharp/csharp-original.svg`, category: 'Backend' },
    { name: '.NET / WPF', icon: `${DEVICON}/dot-net/dot-net-original.svg`, category: 'Backend' },
    { name: 'T-SQL', icon: `${DEVICON}/microsoftsqlserver/microsoftsqlserver-plain.svg`, category: 'Data' },
    { name: 'Python', icon: `${DEVICON}/python/python-original.svg`, category: 'Backend' },
    { name: 'Vue.js', icon: `${DEVICON}/vuejs/vuejs-original.svg`, category: 'Frontend' },
    { name: 'React', icon: `${DEVICON}/react/react-original.svg`, category: 'Frontend' },
    { name: 'JavaScript', icon: `${DEVICON}/javascript/javascript-original.svg`, category: 'Frontend' },
    { name: 'TypeScript', icon: `${DEVICON}/typescript/typescript-original.svg`, category: 'Frontend' },
    { name: 'jQuery', icon: `${DEVICON}/jquery/jquery-original.svg`, category: 'Frontend' },
    { name: 'HTML5', icon: `${DEVICON}/html5/html5-original.svg`, category: 'Frontend' },
    { name: 'CSS3', icon: `${DEVICON}/css3/css3-original.svg`, category: 'Frontend' },
    { name: 'Tailwind', icon: `${DEVICON}/tailwindcss/tailwindcss-original.svg`, category: 'Frontend' },
]

// Smooth scrolling handler that accounts for the sticky header height.
let _scrollAnimId: number | null = null
function cancelScrollAnim() {
    if (_scrollAnimId !== null) {
        cancelAnimationFrame(_scrollAnimId)
        _scrollAnimId = null
    }
}

function animateWindowScrollTo(targetY: number, duration = 500) {
    cancelScrollAnim()
    const startY = window.scrollY || window.pageYOffset
    const diff = targetY - startY
    if (Math.abs(diff) < 1) return
    const startTime = performance.now()
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

    function step(now: number) {
        const p = Math.min(1, (now - startTime) / duration)
        window.scrollTo(0, Math.round(startY + diff * ease(p)))
        if (p < 1) _scrollAnimId = requestAnimationFrame(step)
        else _scrollAnimId = null
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
    const offset = 12
    const targetY = Math.max(rectTop - headerHeight - offset, 0)
    animateWindowScrollTo(targetY)
}

const isMenuOpen = ref(false)
const scrolled = ref(false)

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
}
function closeMenu() {
    isMenuOpen.value = false
}

function onScroll() {
    scrolled.value = window.scrollY > 8
}

onMounted(() => {
    const clickHandler = (ev: MouseEvent) => {
        const target = (ev.target as Element)?.closest
            ? ((ev.target as Element).closest('a') as HTMLAnchorElement | null)
            : null
        if (!target) return
        const href = target.getAttribute('href')
        if (!href || !href.startsWith('#')) return
        if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return

        ev.preventDefault()
        animateScrollToHash(href)
        history.pushState(null, '', href)
    }

    document.addEventListener('click', clickHandler)
    const popHandler = () => animateScrollToHash(location.hash)
    window.addEventListener('popstate', popHandler)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    if (location.hash) {
        setTimeout(() => animateScrollToHash(location.hash), 50)
    }

    onBeforeUnmount(() => {
        document.removeEventListener('click', clickHandler)
        window.removeEventListener('popstate', popHandler)
        window.removeEventListener('scroll', onScroll)
        cancelScrollAnim()
    })
})
</script>

<template>
    <div class="text-slate-900 dark:text-slate-100">
        <!-- Nav -->
        <header :class="[
            'sticky top-0 z-40 transition-all duration-300',
            scrolled
                ? 'backdrop-blur-md bg-white/75 dark:bg-slate-900/75 border-b border-slate-200/60 dark:border-slate-700/40 shadow-[0_4px_30px_-12px_rgba(23,37,84,0.12)]'
                : 'bg-transparent border-b border-transparent'
        ]">
            <nav class="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                <a href="#" class="brand-wordmark">
                    austin<span class="brand-accent">bowdler</span>
                </a>

                <div class="hidden sm:flex items-center gap-6">
                    <ul class="flex gap-6 text-sm">
                        <li><a href="#about" class="nav-link">About</a></li>
                        <li><a href="#skills" class="nav-link">Skills</a></li>
                        <li><a href="#experience" class="nav-link">Experience</a></li>
                        <li><a href="#projects" class="nav-link">Projects</a></li>
                        <li><a href="#contact" class="nav-link">Contact</a></li>
                    </ul>
                    <ThemeSwitcher />
                </div>

                <div class="flex items-center gap-2 sm:hidden">
                    <ThemeSwitcher />
                    <button @click="toggleMenu" aria-label="Toggle menu"
                        class="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </nav>

            <Transition name="mobilemenu">
                <div v-if="isMenuOpen" class="sm:hidden mx-auto max-w-6xl px-4 pb-3">
                    <div class="flex flex-col gap-1 py-2 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur">
                        <a @click="closeMenu" href="#about" class="mobile-link">About</a>
                        <a @click="closeMenu" href="#skills" class="mobile-link">Skills</a>
                        <a @click="closeMenu" href="#experience" class="mobile-link">Experience</a>
                        <a @click="closeMenu" href="#projects" class="mobile-link">Projects</a>
                        <a @click="closeMenu" href="#contact" class="mobile-link">Contact</a>
                    </div>
                </div>
            </Transition>
        </header>

        <!-- Hero -->
        <section class="mx-auto max-w-6xl px-4 py-16 md:py-24" id="top">
            <div class="grid md:grid-cols-[1.1fr_1fr] gap-12 items-center">
                <div
                    v-motion="{ initial: { opacity: 0, y: 22 }, enter: { opacity: 1, y: 0, transition: { duration: 0.7 } } }">
                    <div class="chip" v-motion="{
                        initial: { opacity: 0, y: 12 },
                        enter: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.5 } }
                    }">
                        <span class="chip-dot" /> Available for interesting work
                    </div>

                    <h1 class="hero-title">
                        Hi, I'm <span class="hero-gradient">Austin</span>.
                        <br />
                        I build fast, clean,
                        <span class="hero-underline">beautiful</span>
                        software.
                    </h1>

                    <p class="hero-role">
                        <TypedRoles />
                    </p>

                    <p class="mt-5 text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                        Full-stack developer crafting performant, maintainable apps with Vue, C#,
                        and SQL — with an eye for the details that make interfaces feel great to
                        use.
                    </p>

                    <div class="mt-8 flex flex-wrap gap-3">
                        <a href="#projects" class="btn-primary">
                            View Projects
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M5 12h14M13 5l7 7-7 7" />
                            </svg>
                        </a>
                        <a href="#contact" class="btn-ghost">Get in touch</a>
                    </div>
                </div>

                <div class="hero-portrait-wrap">
                    <div class="hero-portrait"
                        v-motion="{ initial: { opacity: 0, scale: 0.92 }, enter: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.15 } } }">
                        <div class="ring-a" />
                        <div class="ring-b" />
                        <div class="portrait-frame">
                            <NuxtImg src="/images/austinbowdler.png" alt="Austin Bowdler" class="portrait-img" />
                        </div>

                        <!-- Floating tech badges around the portrait -->
                        <div class="float-badge badge-1" :title="'Vue'">
                            <img :src="`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg`"
                                alt="Vue" />
                        </div>
                        <div class="float-badge badge-2" :title="'C#'">
                            <img :src="`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg`"
                                alt="C#" />
                        </div>
                        <div class="float-badge badge-3" :title="'SQL'">
                            <img :src="`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg`"
                                alt="SQL" />
                        </div>
                        <div class="float-badge badge-4" :title="'TypeScript'">
                            <img :src="`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg`"
                                alt="TypeScript" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Stats -->
        <section class="mx-auto max-w-6xl px-4">
            <div class="stats-card"
                v-motion="{ initial: { opacity: 0, y: 18 }, visibleOnce: { opacity: 1, y: 0, transition: { duration: 0.6 } } }">
                <StatCounter :value="10" suffix="+" label="Years building software" />
                <StatCounter :value="12" suffix="+" label="Languages & frameworks" />
                <StatCounter :value="1" suffix="" label="Team of engineers led" />
                <StatCounter :value="100" suffix="%" label="Caffeinated" />
            </div>
        </section>

        <!-- About -->
        <section id="about" class="mx-auto max-w-6xl px-4 py-20">
            <div v-motion="{ initial: { opacity: 0, y: 20 }, visibleOnce: { opacity: 1, y: 0 } }">
                <h2 class="section-heading">About</h2>
                <p class="mt-5 text-slate-700 dark:text-slate-300 leading-relaxed text-lg max-w-3xl">
                    Technology professional and self-starter focused on problem solving and
                    building enterprise-level software in direct support of business objectives.
                    My career has been defined by increasing responsibility across application
                    design, systems analysis, and development — and by a deep love for shipping
                    polished, reliable product.
                </p>
            </div>
        </section>

        <!-- Skills -->
        <section id="skills" class="mx-auto max-w-6xl px-4 py-20">
            <div v-motion="{ initial: { opacity: 0, y: 16 }, visibleOnce: { opacity: 1, y: 0 } }">
                <h2 class="section-heading">Skills</h2>
                <p class="section-sub">The stack I reach for every day.</p>
            </div>
            <SkillsGrid class="mt-10" :skills="skills" />
        </section>

        <!-- Experience -->
        <section id="experience" class="mx-auto max-w-6xl px-4 py-20">
            <div v-motion="{ initial: { opacity: 0, y: 16 }, visibleOnce: { opacity: 1, y: 0 } }">
                <h2 class="section-heading">Experience</h2>
                <p class="section-sub">A decade of shipping software that matters.</p>
            </div>
            <ExperienceTimeline class="mt-10" />
        </section>

        <!-- Projects -->
        <section id="projects" class="mx-auto max-w-6xl px-4 py-20">
            <div v-motion="{ initial: { opacity: 0, y: 16 }, visibleOnce: { opacity: 1, y: 0 } }">
                <h2 class="section-heading">Projects</h2>
                <p class="section-sub">A selection of work I've shipped.</p>
            </div>
            <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProjectCard v-for="p in projects" :key="p.title" :project="p" />
            </div>
        </section>

        <!-- Contact -->
        <section id="contact" class="mx-auto max-w-6xl px-4 py-20">
            <div class="contact-card"
                v-motion="{ initial: { opacity: 0, y: 20 }, visibleOnce: { opacity: 1, y: 0, transition: { duration: 0.6 } } }">
                <div class="contact-grid">
                    <div>
                        <h2 class="section-heading">Let's build something.</h2>
                        <p class="mt-3 text-slate-700 dark:text-slate-300 max-w-md">
                            Open to chat about freelance work, collaborations, or fun ideas.
                        </p>
                    </div>
                    <div class="flex flex-wrap gap-3 md:justify-end items-start">
                        <a href="mailto:austin@austinbowdler.com" class="btn-primary">
                            Email me
                        </a>
                        <a href="https://github.com/austinbowdler" target="_blank" rel="noopener" class="btn-ghost">
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <footer class="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-500 dark:text-slate-400 flex justify-between">
            <span>© {{ year }} Austin Bowdler</span>
            <span class="hidden sm:inline">Built with Vue · Nuxt · Tailwind</span>
        </footer>
    </div>
</template>

<style>
html {
    scroll-behavior: smooth;
}

body {
    font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans';
}
</style>

<style scoped>
/* —— Nav —— */
.brand-wordmark {
    font-weight: 800;
    letter-spacing: -0.01em;
    font-size: 1.05rem;
}

.brand-accent {
    background: linear-gradient(135deg, #66aebf, #438ca4);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.nav-link {
    position: relative;
    padding: 4px 2px;
    color: inherit;
    transition: color 200ms ease;
}

.nav-link::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: linear-gradient(90deg, #66aebf, #438ca4);
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 250ms cubic-bezier(.2, .8, .2, 1);
}

.nav-link:hover {
    color: #2b5d66;
}

.nav-link:hover::after {
    transform: scaleX(1);
}

.mobile-link {
    padding: 10px 16px;
    border-radius: 10px;
    transition: background 200ms ease;
}

.mobile-link:hover,
.mobile-link:active {
    background: rgba(102, 174, 191, 0.12);
}

.mobilemenu-enter-active,
.mobilemenu-leave-active {
    transition: opacity 200ms ease, transform 200ms ease;
}

.mobilemenu-enter-from,
.mobilemenu-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}

/* —— Hero —— */
.chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: 9999px;
    font-size: 0.78rem;
    font-weight: 500;
    background: rgba(102, 174, 191, 0.12);
    color: #2b5d66;
    border: 1px solid rgba(102, 174, 191, 0.3);
    backdrop-filter: blur(6px);
}

.chip-dot {
    width: 8px;
    height: 8px;
    border-radius: 9999px;
    background: #22c55e;
    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2);
    animation: chip-pulse 2s ease-in-out infinite;
}

@keyframes chip-pulse {

    0%,
    100% {
        box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2);
    }

    50% {
        box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
    }
}

.hero-title {
    margin-top: 1.25rem;
    font-size: clamp(2.25rem, 5.2vw, 4rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.03em;
}

.hero-gradient {
    background: linear-gradient(135deg, #9fcbd3 0%, #66aebf 35%, #438ca4 70%, #2b5d66 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    background-size: 200% 200%;
    animation: hero-gradient-shift 8s ease-in-out infinite;
}

@keyframes hero-gradient-shift {

    0%,
    100% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }
}

.hero-underline {
    position: relative;
    white-space: nowrap;
}

.hero-underline::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.05em;
    height: 0.24em;
    background: linear-gradient(90deg, rgba(102, 174, 191, 0.35), rgba(67, 140, 164, 0.35));
    border-radius: 4px;
    z-index: -1;
}

.hero-role {
    margin-top: 0.9rem;
    font-size: 1.1rem;
    font-weight: 500;
    color: #2b5d66;
}

.btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0.7rem 1.25rem;
    border-radius: 1rem;
    font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, #66aebf, #438ca4);
    box-shadow: 0 10px 30px -10px rgba(67, 140, 164, 0.6);
    transition: transform 220ms cubic-bezier(.2, .8, .2, 1), box-shadow 220ms ease, filter 220ms ease;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 40px -12px rgba(67, 140, 164, 0.75);
    filter: brightness(1.05);
}

.btn-primary:active {
    transform: translateY(0);
}

.btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0.7rem 1.25rem;
    border-radius: 1rem;
    font-weight: 600;
    border: 1px solid rgba(148, 163, 184, 0.45);
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(8px);
    transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
}

.btn-ghost:hover {
    transform: translateY(-2px);
    border-color: #66aebf;
}

/* —— Portrait —— */
.hero-portrait-wrap {
    display: flex;
    justify-content: center;
}

.hero-portrait {
    position: relative;
    width: min(78vw, 420px);
    aspect-ratio: 1 / 1;
}

.ring-a,
.ring-b {
    position: absolute;
    inset: -10%;
    border-radius: 9999px;
    border: 2px dashed rgba(102, 174, 191, 0.4);
    animation: spin 28s linear infinite;
}

.ring-b {
    inset: -22%;
    border: 1px dashed rgba(102, 174, 191, 0.22);
    animation: spin 42s linear infinite reverse;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.portrait-frame {
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    padding: 6px;
    background: conic-gradient(from 120deg, #66aebf, #438ca4, #9fcbd3, #66aebf);
    box-shadow: 0 40px 80px -20px rgba(23, 37, 84, 0.35);
}

.portrait-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 9999px;
    background: #0f172a;
}

.float-badge {
    position: absolute;
    width: 52px;
    height: 52px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(8px);
    box-shadow: 0 14px 30px -10px rgba(23, 37, 84, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    animation: float 6s ease-in-out infinite;
}

.float-badge img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.badge-1 {
    top: -4%;
    right: -4%;
    animation-delay: 0s;
}

.badge-2 {
    bottom: 8%;
    right: -10%;
    animation-delay: 1.2s;
}

.badge-3 {
    bottom: -6%;
    left: 8%;
    animation-delay: 2.4s;
}

.badge-4 {
    top: 14%;
    left: -10%;
    animation-delay: 3.6s;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

/* —— Stats —— */
.stats-card {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    padding: 1rem;
    border-radius: 1.5rem;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(148, 163, 184, 0.2);
    box-shadow: 0 20px 50px -20px rgba(23, 37, 84, 0.15);
}

@media (min-width: 640px) {
    .stats-card {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
}

/* —— Section heading —— */
.section-heading {
    position: relative;
    display: inline-block;
    font-size: clamp(1.5rem, 2.4vw, 2rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    padding-bottom: 0.45rem;
}

.section-heading::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 42px;
    background: linear-gradient(90deg, #66aebf, #438ca4);
    border-radius: 4px;
}

.section-sub {
    margin-top: 0.5rem;
    color: rgb(100 116 139);
    font-size: 0.95rem;
}

/* —— Contact card —— */
.contact-card {
    padding: 2rem;
    border-radius: 1.75rem;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(148, 163, 184, 0.2);
    box-shadow: 0 30px 60px -24px rgba(23, 37, 84, 0.2);
    position: relative;
    overflow: hidden;
}

.contact-card::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 400px;
    height: 400px;
    border-radius: 9999px;
    background: radial-gradient(circle, rgba(102, 174, 191, 0.22), transparent 70%);
    pointer-events: none;
}

.contact-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    align-items: center;
}

@media (min-width: 768px) {
    .contact-grid {
        grid-template-columns: 1.3fr 1fr;
    }
}
</style>

<style>
html.dark .nav-link:hover {
    color: #cfe3e8;
}

html.dark .chip {
    color: #cfe3e8;
}

html.dark .hero-role {
    color: #9fcbd3;
}

html.dark .btn-ghost {
    background: rgba(30, 41, 59, 0.4);
    border-color: rgba(148, 163, 184, 0.3);
}

html.dark .float-badge {
    background: rgba(30, 41, 59, 0.88);
}

html.dark .stats-card {
    background: rgba(30, 41, 59, 0.55);
    border-color: rgba(148, 163, 184, 0.15);
}

html.dark .section-sub {
    color: rgb(148 163 184);
}

html.dark .contact-card {
    background: rgba(30, 41, 59, 0.65);
    border-color: rgba(148, 163, 184, 0.15);
}
</style>
