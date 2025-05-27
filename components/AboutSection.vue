<script setup lang="ts">
const skills = [
    { name: 'Vue.js', icon: ['fab', 'vuejs'] },
    { name: 'JavaScript', icon: ['fab', 'js-square'] },
    { name: 'C#', icon: ['fab', 'windows'] },
    { name: 'React', icon: ['fab', 'react'] },
    { name: 'T-SQL', icon: ['fas', 'database'] },
    { name: 'jQuery', icon: ['fab', 'js-square'] },
    { name: 'WPF', icon: ['fas', 'desktop'] },
    { name: 'HTML', icon: ['fab', 'html5'] },
    { name: 'CSS', icon: ['fab', 'css3'] },
]
</script>

<template>
    <section class="min-h-screen flex items-center justify-center px-8 bg-gray-50">
        <div class="max-w-2xl text-center space-y-6">
            <h2 class="text-3xl font-bold">About Me</h2>
            <!-- Updated paragraphs -->
            <p class="text-gray-700">
                I'm a passionate technology professional with expertise in application design,
                systems analysis, and development. With a background in full-stack engineering,
                I love translating ideas into performant, maintainable solutions.
            </p>
            <p class="text-gray-700">
                Currently, I serve as a Software Development Supervisor at AlignRx, leading a
                dedicated team to build scalable web applications. Mentoring colleagues and
                collaborating with stakeholders are some of my favorite parts of the role—
                ensuring the best outcomes for the business and our users alike.
            </p>

            <!-- New Skills section -->
            <div class="mt-8">
                <h3 class="text-2xl font-bold mb-4">Skills</h3>
                <ul class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <li v-for="skill in skills" :key="skill.name" class="flex items-center space-x-2 justify-center">
                        <!-- Actual icon reference using the skill's icon property -->
                        <font-awesome-icon :icon="skill.icon" />
                        <span>{{ skill.name }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>