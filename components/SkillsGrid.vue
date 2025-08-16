<script setup lang="ts">
const props = defineProps<{ skills: { name: string; icon: string }[] }>()

const iconComponent = (icon: string) => {
    // convert 'si:python' -> 'i-si-python' (unplugin-icons component name)
    return `i-${icon.replace(':', '-')}`
}
</script>

<template>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div v-for="s in skills" :key="s.name"
            class="group relative rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-glass hover:shadow-lg transition overflow-hidden"
            v-motion="{ initial: { opacity: 0, y: 12 }, enter: { opacity: 1, y: 0 } }">
            <div class="flex items-center gap-3">
                <component :is="iconComponent(s.icon)" class="h-8 w-8" />
                <span class="font-medium">{{ s.name }}</span>
            </div>
            <div
                class="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-brand-200/60 blur-2xl opacity-0 group-hover:opacity-100 transition" />
        </div>
    </div>
</template>
