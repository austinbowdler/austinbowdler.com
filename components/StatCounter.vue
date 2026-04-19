<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = withDefaults(defineProps<{
    value: number
    label: string
    suffix?: string
    duration?: number
}>(), {
    suffix: '',
    duration: 1400,
})

const display = ref(0)
const el = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null
let started = false

function animate() {
    if (started) return
    started = true

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
        display.value = props.value
        return
    }

    const start = performance.now()
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)
    const tick = (now: number) => {
        const p = Math.min(1, (now - start) / props.duration)
        display.value = Math.round(props.value * ease(p))
        if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
}

onMounted(() => {
    if (!el.value) return
    observer = new IntersectionObserver((entries) => {
        for (const e of entries) {
            if (e.isIntersecting) {
                animate()
                observer?.disconnect()
                break
            }
        }
    }, { threshold: 0.3 })
    observer.observe(el.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
    <div ref="el" class="stat">
        <div class="stat-value">
            <span>{{ display }}</span><span class="stat-suffix">{{ suffix }}</span>
        </div>
        <div class="stat-label">{{ label }}</div>
    </div>
</template>

<style scoped>
.stat {
    text-align: center;
    padding: 1.25rem 1rem;
}

.stat-value {
    font-size: clamp(2rem, 4vw, 2.75rem);
    font-weight: 800;
    background: linear-gradient(135deg, #66aebf, #438ca4 60%, #2b5d66);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    line-height: 1;
    letter-spacing: -0.02em;
}

.stat-suffix {
    margin-left: 2px;
}

.stat-label {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: rgb(100 116 139);
    letter-spacing: 0.02em;
}
</style>

<style>
html.dark .stat-label {
    color: rgb(148 163 184);
}
</style>
