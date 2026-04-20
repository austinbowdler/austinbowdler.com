<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const props = withDefaults(defineProps<{
    roles?: string[]
    typeSpeed?: number
    eraseSpeed?: number
    pause?: number
}>(), {
    roles: () => ['Software Development Supervisor', 'Full-Stack Engineer', 'Vue + .NET Specialist', 'Problem Solver'],
    typeSpeed: 70,
    eraseSpeed: 35,
    pause: 1400
})

const text = ref('')
const caretOn = ref(true)
let timer: number | null = null
let caretTimer: number | null = null
let roleIdx = 0
let charIdx = 0
let erasing = false
let stopped = false

function step() {
    if (stopped) return
    const role = props.roles[roleIdx]
    if (!erasing) {
        charIdx++
        text.value = role.slice(0, charIdx)
        if (charIdx >= role.length) {
            erasing = true
            timer = window.setTimeout(step, props.pause)
            return
        }
        timer = window.setTimeout(step, props.typeSpeed)
    } else {
        charIdx--
        text.value = role.slice(0, Math.max(0, charIdx))
        if (charIdx <= 0) {
            erasing = false
            roleIdx = (roleIdx + 1) % props.roles.length
            timer = window.setTimeout(step, 320)
            return
        }
        timer = window.setTimeout(step, props.eraseSpeed)
    }
}

onMounted(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
        text.value = props.roles[0]
        return
    }
    timer = window.setTimeout(step, 400)
    caretTimer = window.setInterval(() => (caretOn.value = !caretOn.value), 520)
})

onBeforeUnmount(() => {
    stopped = true
    if (timer) clearTimeout(timer)
    if (caretTimer) clearInterval(caretTimer)
})
</script>

<template>
    <span class="typed-roles">
        <span>{{ text }}</span>
        <span :class="['caret', { 'caret-on': caretOn }]">|</span>
    </span>
</template>

<style scoped>
.typed-roles {
    display: inline-flex;
    align-items: baseline;
    gap: 2px;
}

.caret {
    display: inline-block;
    color: #438ca4;
    font-weight: 300;
    transform: translateY(-1px);
    opacity: 0;
    transition: opacity 80ms linear;
}

.caret-on {
    opacity: 1;
}
</style>
