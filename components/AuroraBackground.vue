<script setup lang="ts">
import { onMounted, ref } from 'vue'

const reduced = ref(false)

onMounted(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced.value = mq.matches
    mq.addEventListener('change', (e) => (reduced.value = e.matches))
})
</script>

<template>
    <div aria-hidden="true" class="aurora-root pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div class="aurora-grid" />
        <div :class="['aurora-blob aurora-blob-1', { 'aurora-still': reduced }]" />
        <div :class="['aurora-blob aurora-blob-2', { 'aurora-still': reduced }]" />
        <div :class="['aurora-blob aurora-blob-3', { 'aurora-still': reduced }]" />
        <div class="aurora-noise" />
    </div>
</template>

<style scoped>
.aurora-root {
    --c1: 67, 140, 164;
    /* brand 500 */
    --c2: 102, 174, 191;
    /* brand 400 */
    --c3: 159, 203, 211;
    /* brand 300 */
}

.aurora-grid {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(to right, rgba(100, 116, 139, 0.08) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(100, 116, 139, 0.08) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse at center, black 40%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 75%);
}

.aurora-blob {
    position: absolute;
    width: 55vw;
    height: 55vw;
    max-width: 760px;
    max-height: 760px;
    border-radius: 9999px;
    filter: blur(90px);
    opacity: 0.55;
    will-change: transform;
}

.aurora-blob-1 {
    top: -10vw;
    left: -10vw;
    background: radial-gradient(circle at 30% 30%, rgba(var(--c1), 0.9), transparent 60%);
    animation: aurora-float-1 22s ease-in-out infinite alternate;
}

.aurora-blob-2 {
    top: 15vh;
    right: -15vw;
    background: radial-gradient(circle at 60% 40%, rgba(var(--c2), 0.85), transparent 60%);
    animation: aurora-float-2 26s ease-in-out infinite alternate;
}

.aurora-blob-3 {
    bottom: -15vw;
    left: 25vw;
    background: radial-gradient(circle at 50% 50%, rgba(var(--c3), 0.7), transparent 65%);
    animation: aurora-float-3 30s ease-in-out infinite alternate;
}

.aurora-still {
    animation: none !important;
}

.aurora-noise {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
    opacity: 0.12;
    mix-blend-mode: overlay;
}

@keyframes aurora-float-1 {
    0% {
        transform: translate3d(0, 0, 0) scale(1);
    }

    100% {
        transform: translate3d(8vw, 6vh, 0) scale(1.1);
    }
}

@keyframes aurora-float-2 {
    0% {
        transform: translate3d(0, 0, 0) scale(1);
    }

    100% {
        transform: translate3d(-6vw, 8vh, 0) scale(1.08);
    }
}

@keyframes aurora-float-3 {
    0% {
        transform: translate3d(0, 0, 0) scale(1);
    }

    100% {
        transform: translate3d(4vw, -6vh, 0) scale(1.12);
    }
}

@media (prefers-reduced-motion: reduce) {
    .aurora-blob {
        animation: none !important;
    }
}
</style>

<style>
html.dark .aurora-blob {
    opacity: 0.35;
}

html:not(.dark) .aurora-blob {
    opacity: 0.45;
}
</style>
