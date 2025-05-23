<script setup lang="ts">
import ProjectCard from '@/components/ProjectCard.vue'
const projects = [
    { title: 'Project One', description: 'Description for project one.', image: '/images/project1.jpg', link: '#' },
    { title: 'Project Two', description: 'Description for project two.', image: '/images/project2.jpg', link: '#' },
    { title: 'Project Three', description: 'Description for project three.', image: '/images/project3.jpg', link: '#' }
]
</script>

<template>
    <section id="projects" class="min-h-screen px-8 py-12 bg-white">
        <h2 class="text-3xl font-bold text-center mb-8">Projects</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard v-for="project in projects" :key="project.title" :project="project" />
        </div>
    </section>
</template>