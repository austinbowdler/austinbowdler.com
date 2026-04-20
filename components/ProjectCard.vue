<script setup lang="ts">
const props = defineProps<{
    project: {
        title: string
        description: string
        year: number
        tags: string[]
        url?: string
        repo?: string
        cover?: string
        highlights?: string[]
        featured?: boolean
        comingSoon?: boolean
    }
}>()

const tagColors: Record<string, string> = {
    'Vue 3': '#42B883',
    'Vue.js': '#42B883',
    'React': '#61DAFB',
    'C#': '#9B4F96',
    '.NET': '#512BD4',
    'SQL': '#4479A1',
    'T-SQL': '#4479A1',
    'jQuery': '#0769AD',
    'JavaScript': '#F7DF1E',
    'TypeScript': '#3178C6',
    'Python': '#3776AB',
    'HTML': '#E34F26',
    'CSS': '#1572B6',
    'Tailwind': '#38BDF8',
    'Nuxt': '#00DC82',
}

function tagStyle(tag: string) {
    const color = tagColors[tag] || '#66aebf'
    return {
        color,
        borderColor: `${color}55`,
        background: `${color}10`,
    }
}
</script>

<template>
    <article class="project-card group"
        v-motion="{ initial: { opacity: 0, y: 18 }, visibleOnce: { opacity: 1, y: 0, transition: { duration: 0.6 } } }">
        <div class="project-border" />
        <div class="project-inner">
            <div class="cover-wrap">
                <template v-if="project.comingSoon">
                    <div class="cover cover-placeholder">
                        <svg class="placeholder-icon" xmlns="http://www.w3.org/2000/svg" width="44" height="44"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
                            stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 7v5l3 2" />
                        </svg>
                    </div>
                    <span class="soon-badge">Coming soon</span>
                </template>
                <template v-else>
                    <NuxtImg :src="project.cover" :alt="project.title" class="cover" loading="lazy" />
                    <div class="cover-fade" />
                    <span v-if="project.featured" class="featured-badge">★ Featured</span>
                </template>
            </div>
            <div class="p-5">
                <div class="flex items-start justify-between gap-3">
                    <h3 class="title">{{ project.title }}</h3>
                    <span class="year">{{ project.year }}</span>
                </div>
                <p class="desc">{{ project.description }}</p>
                <div class="mt-3 flex flex-wrap gap-2">
                    <span v-for="t in project.tags" :key="t" class="tag" :style="tagStyle(t)">
                        {{ t }}
                    </span>
                </div>
                <div v-if="project.url || project.repo" class="mt-4 flex gap-4 text-sm">
                    <a v-if="project.url" :href="project.url" target="_blank" rel="noopener" class="link">
                        Check it out
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M7 17L17 7M9 7h8v8" />
                        </svg>
                    </a>
                    <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener" class="link">
                        Code
                    </a>
                </div>
            </div>
        </div>
    </article>
</template>

<style scoped>
.project-card {
    position: relative;
    border-radius: 1.5rem;
    padding: 1px;
    overflow: hidden;
    transition: transform 320ms cubic-bezier(.2, .8, .2, 1), box-shadow 320ms ease;
}

.project-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 24px 60px -20px rgba(23, 37, 84, 0.25);
}

.project-border {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(135deg, rgba(102, 174, 191, 0.55), rgba(148, 163, 184, 0.15) 35%, rgba(67, 140, 164, 0.5) 100%);
    opacity: 0.5;
    transition: opacity 320ms ease;
    z-index: 0;
}

.project-card:hover .project-border {
    opacity: 1;
}

.project-inner {
    position: relative;
    z-index: 1;
    border-radius: calc(1.5rem - 1px);
    overflow: hidden;
    background: rgba(255, 255, 255, 0.78);
    backdrop-filter: blur(10px);
}

.cover-wrap {
    position: relative;
    overflow: hidden;
    height: 12rem;
}

.cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 700ms cubic-bezier(.2, .8, .2, 1);
}

.project-card:hover .cover {
    transform: scale(1.06);
}

.cover-fade {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 60%, rgba(15, 23, 42, 0.35));
}

.featured-badge {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    font-size: 0.7rem;
    font-weight: 600;
    color: #fff;
    padding: 4px 10px;
    border-radius: 9999px;
    background: linear-gradient(135deg, #66aebf, #438ca4);
    box-shadow: 0 4px 16px rgba(67, 140, 164, 0.45);
}

.cover-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    background:
        radial-gradient(circle at 30% 20%, rgba(159, 203, 211, 0.35), transparent 55%),
        radial-gradient(circle at 75% 80%, rgba(67, 140, 164, 0.3), transparent 60%),
        linear-gradient(135deg, rgba(102, 174, 191, 0.18), rgba(148, 163, 184, 0.12));
    color: #438ca4;
}

.placeholder-icon {
    opacity: 0.7;
    animation: soon-pulse 3.2s ease-in-out infinite;
}

@keyframes soon-pulse {

    0%,
    100% {
        opacity: 0.55;
        transform: scale(1);
    }

    50% {
        opacity: 0.9;
        transform: scale(1.05);
    }
}

.soon-badge {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    font-size: 0.7rem;
    font-weight: 600;
    color: #2b5d66;
    padding: 4px 10px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(102, 174, 191, 0.4);
    backdrop-filter: blur(6px);
}

.title {
    font-weight: 700;
    font-size: 1.125rem;
    color: rgb(15 23 42);
    letter-spacing: -0.01em;
}

.year {
    font-size: 0.75rem;
    color: rgb(100 116 139);
    flex-shrink: 0;
    padding-top: 4px;
}

.desc {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: rgb(71 85 105);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.tag {
    font-size: 0.72rem;
    padding: 2px 10px;
    border-radius: 9999px;
    border: 1px solid;
    font-weight: 500;
}

.link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #438ca4;
    font-weight: 500;
    transition: gap 200ms ease, color 200ms ease;
}

.link:hover {
    color: #2b5d66;
    gap: 8px;
}

</style>

<style>
html.dark .project-inner {
    background: rgba(30, 41, 59, 0.7);
}

html.dark .title {
    color: rgb(241 245 249);
}

html.dark .desc {
    color: rgb(203 213 225);
}

html.dark .link {
    color: #9fcbd3;
}

html.dark .link:hover {
    color: #cfe3e8;
}

html.dark .cover-placeholder {
    color: #9fcbd3;
    background:
        radial-gradient(circle at 30% 20%, rgba(159, 203, 211, 0.25), transparent 55%),
        radial-gradient(circle at 75% 80%, rgba(67, 140, 164, 0.22), transparent 60%),
        linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.6));
}

html.dark .soon-badge {
    color: #cfe3e8;
    background: rgba(30, 41, 59, 0.75);
    border-color: rgba(159, 203, 211, 0.3);
}
</style>
