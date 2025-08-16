<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{ skills: { name: string; icon: string }[] }>()
const hovered = ref<string | null>(null)
</script>

<template>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div v-for="s in props.skills" :key="s.name"
            class="group relative rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-glass hover:shadow-lg transition overflow-hidden"
            v-motion="{ initial: { opacity: 0, y: 12 }, enter: { opacity: 1, y: 0 } }" @mouseenter="hovered = s.name"
            @mouseleave="hovered = null">
            <div class="flex items-center gap-3">
                <img :src="s.icon" :alt="s.name" class="h-8 w-8 object-contain" loading="lazy" />
                <span class="font-medium">{{ s.name }}</span>
            </div>
            <div
                class="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-brand-200/60 blur-2xl opacity-0 group-hover:opacity-100 transition" />
        </div>
    </div>
</template>