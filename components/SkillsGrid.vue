<!-- SkillsGrid.vue -->
<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{ skills: { name: string; icon: string }[] }>()
</script>

<template>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div v-for="s in skills" :key="s.name"
            class="group relative rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-glass hover:shadow-lg transition overflow-hidden"
            v-motion="{ initial: { opacity: 0, y: 12 }, enter: { opacity: 1, y: 0 } }">
            <div class="flex items-center gap-3">
                <Icon :icon="s.icon" class="h-8 w-8" />
                <span class="font-medium">{{ s.name }}</span>
            </div>
        </div>
    </div>
</template>