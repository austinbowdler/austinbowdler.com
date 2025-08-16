<script setup lang="ts">
defineProps<{
    project: {
        title: string, description: string, year: number, tags: string[], url?: string, repo?: string, cover: string
    }
}>()
</script>

<template>
    <article
        class="group rounded-3xl overflow-hidden bg-white/70 border border-slate-200 shadow-glass hover:shadow-lg transition"
        v-motion="{ initial: { opacity: 0, y: 15 }, enter: { opacity: 1, y: 0 } }">
        <NuxtImg :src="project.cover" :alt="project.title"
            class="h-44 w-full object-cover group-hover:scale-[1.02] transition" />
        <div class="p-5">
            <div class="flex items-center justify-between">
                <h3 class="font-semibold text-lg">{{ project.title }}</h3>
                <span class="text-xs text-slate-500">{{ project.year }}</span>
            </div>
            <p class="mt-2 text-sm text-slate-600 line-clamp-3">{{ project.description }}</p>
            <div class="mt-3 flex flex-wrap gap-2">
                <span v-for="t in project.tags" :key="t"
                    class="text-xs px-2 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-100">
                    {{ t }}
                </span>
            </div>
            <div class="mt-4 flex gap-3">
                <a v-if="project.url" :href="project.url" target="_blank"
                    class="text-sm underline underline-offset-4">Check it out</a>
                <!-- <a v-if="project.repo" :href="project.repo" target="_blank"
                    class="text-sm underline underline-offset-4">Code</a> -->
            </div>
        </div>
    </article>
</template>
