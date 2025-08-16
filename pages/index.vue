<script setup lang="ts">
import { useFetch } from 'nuxt/app';
const { data: projects } = await useFetch('/api/projects')
const year = new Date().getFullYear()

const skills = [
    { name: 'C#', icon: '/icons/csharp.svg' },
    { name: 'Vue.js', icon: '/icons/vue-dot-js.svg' },
    { name: 'React', icon: '/icons/react.svg' },
    { name: 'JavaScript', icon: '/icons/javascript.svg' },
    { name: 'jQuery', icon: '/icons/jquery.svg' },
    { name: 'T-SQL', icon: '/icons/microsoftsqlserver.svg' },
    { name: 'Python', icon: '/icons/python.svg' },
    { name: 'WPF', icon: '/icons/windows.svg' },
    { name: 'HTML5', icon: '/icons/html5.svg' },
    { name: 'CSS3', icon: '/icons/css3.svg' }
]
</script>

<template>
    <div class="min-h-screen bg-gradient-to-b from-white to-brand-50 text-slate-900">
        <!-- Nav -->
        <header class="sticky top-0 z-40 backdrop-blur bg-white/60 border-b border-slate-200/60">
            <nav class="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                <a href="#" class="font-bold">austin<span class="text-brand-500">bowdler</span>.com</a>
                <ul class="flex gap-6 text-sm">
                    <li><a href="#about" class="hover:text-brand-600">About</a></li>
                    <li><a href="#projects" class="hover:text-brand-600">Projects</a></li>
                    <li><a href="#contact" class="hover:text-brand-600">Contact</a></li>
                </ul>
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
                <div class="relative">
                    <NuxtImg src="/images/austinbowdler.jpg" alt="Austin working" class="rounded-3xl shadow-glass" />
                    <div class="absolute -bottom-6 -left-6 w-28 h-28 rounded-3xl bg-brand-200 blur-2xl opacity-70" />
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
                <span class="text-sm text-slate-500">at a glance</span>
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
            <div class="rounded-3xl p-8 bg-white/70 border border-slate-200 shadow-glass"
                v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, delay: 0.1 } }">
                <h2 class="text-2xl font-bold">Contact</h2>
                <p class="mt-3 text-slate-700">Open to chat about freelance, collaborations, or fun ideas.</p>
                <div class="mt-6 flex gap-4">
                    <a href="mailto:austin@austinbowdler.com"
                        class="px-5 py-3 rounded-2xl bg-slate-900 text-white">Email me</a>
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
