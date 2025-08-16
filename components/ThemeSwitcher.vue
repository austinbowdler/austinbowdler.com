<script setup lang="ts">
import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'theme'
const theme = ref<'light' | 'dark' | 'system'>('system')

function applyTheme(t: string) {
    const html = document.documentElement
    if (t === 'dark') {
        html.classList.add('dark')
    } else if (t === 'light') {
        html.classList.remove('dark')
    } else {
        // system - follow prefers-color-scheme
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        if (prefersDark) html.classList.add('dark')
        else html.classList.remove('dark')
    }
}

function setTheme(t: 'light' | 'dark' | 'system') {
    theme.value = t
    localStorage.setItem(STORAGE_KEY, t)
    applyTheme(t)
}

function toggle() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
}

onMounted(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as 'light' | 'dark' | 'system' | null
    if (stored) {
        theme.value = stored
        applyTheme(stored)
    } else {
        // default to system
        theme.value = 'system'
        applyTheme('system')
    }

    // Listen to system changes when in 'system' mode
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
        if (theme.value === 'system') applyTheme('system')
    }
    mq.addEventListener('change', handler)
})
</script>

<template>
    <div class="flex items-center gap-2">
        <button @click="toggle" :aria-label="theme === 'dark' ? 'Switch to light' : 'Switch to dark'"
            class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition">
            <font-awesome-icon :icon="theme === 'dark' ? ['fas', 'sun'] : ['fas', 'moon']" />
        </button>
    </div>
</template>

<style scoped>
button {
    line-height: 0;
}
</style>
