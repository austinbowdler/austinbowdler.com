<script setup lang="ts">
interface Project {
    title: string;
    description: string;
    image: string;
    link: string;
}

const props = defineProps<{ project: Project }>();
</script>

<template>
    <div class="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover" />
        <div class="p-4">
            <h3 class="text-xl font-semibold mb-2">{{ project.title }}</h3>
            <p class="text-gray-700 mb-4">{{ project.description }}</p>
            <a :href="project.link" target="_blank" class="text-blue-600 hover:underline">
                View Details →
            </a>
        </div>
    </div>
</template>