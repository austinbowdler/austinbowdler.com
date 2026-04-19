<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const progress = ref(0)
let ticking = false

function onScroll() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
        const doc = document.documentElement
        const scrollable = (doc.scrollHeight - doc.clientHeight) || 1
        progress.value = Math.min(1, Math.max(0, window.scrollY / scrollable))
        ticking = false
    })
}

onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
})
</script>

<template>
    <div class="scroll-progress-track" aria-hidden="true">
        <div class="scroll-progress-bar" :style="{ transform: `scaleX(${progress})` }" />
    </div>
</template>

<style scoped>
.scroll-progress-track {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    z-index: 60;
    background: transparent;
    pointer-events: none;
}

.scroll-progress-bar {
    height: 100%;
    width: 100%;
    transform-origin: 0 50%;
    background: linear-gradient(90deg, #66aebf 0%, #438ca4 50%, #2b5d66 100%);
    box-shadow: 0 0 12px rgba(67, 140, 164, 0.55);
    transition: transform 80ms linear;
}
</style>
