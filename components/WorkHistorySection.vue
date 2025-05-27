<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

interface Role {
    title: string
    period: string
}
interface Entry {
    company: string
    location: string
    date: string
    roles: Role[]
}

const timeline: Entry[] = [
    {
        company: 'AlignRx',
        location: 'Edmond, OK',
        date: '01/2022 – Present',
        roles: [
            { title: 'Senior Development Supervisor', period: '09/2024 – Present' },
            { title: 'Senior Software Engineer', period: '01/2023 – 09/2024' },
            { title: 'Software Engineer', period: '01/2022 – 01/2023' },
        ],
    },
    {
        company: 'PPOk',
        location: 'Edmond, OK',
        date: '06/2014 – 01/2022',
        roles: [
            { title: 'Software Developer II', period: '01/2020 – 01/2022' },
            { title: 'Software Developer I', period: '01/2018 – 01/2020' },
            { title: 'Software Development Intern', period: '06/2014 – 01/2018' },
        ],
    },
]

// Tracks which roles are visible
const visibleRoles = ref<Record<string, boolean>>({})

onMounted(() => {
    // Initialize each role as hidden
    timeline.forEach(entry => {
        entry.roles.forEach(role => {
            const id = role.title.replace(/\s+/g, '-').toLowerCase()
            visibleRoles.value[id] = false
        })
    })

    // Observe each role element on the page
    nextTick(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const roleId = entry.target.getAttribute('data-role-id')
                    if (roleId) {
                        visibleRoles.value[roleId] = true
                    }
                    observer.unobserve(entry.target)
                }
            })
        })

        timeline.forEach(entry => {
            entry.roles.forEach(role => {
                const id = role.title.replace(/\s+/g, '-').toLowerCase()
                const el = document.querySelector(`[data-role-id="${id}"]`)
                if (el) observer.observe(el)
            })
        })
    })
})
</script>

<template>
    <section id="work-history" class="py-8">
        <h2 class="text-3xl font-bold text-center mb-8">Work History</h2>
        <div class="flex justify-center">
            <!-- The vertical border line -->
            <div class="relative border-l-2 border-blue-900 space-y-12 px-4">
                <!-- Loop over each company -->
                <div v-for="entry in timeline" :key="entry.company" class="relative pt-8">
                    <!-- Slight left margin so text sits to the right of the line -->
                    <p class="ml-8 text-gray-600 mb-1">{{ entry.date }}</p>
                    <h3 class="ml-8 text-xl font-semibold">
                        {{ entry.company }}
                        <span class="text-gray-500">| {{ entry.location }}</span>
                    </h3>

                    <!-- Roles on the line -->
                    <ul class="mt-2 space-y-4 ml-8">
                        <li v-for="role in entry.roles" :key="role.title"
                            class="relative transition-all duration-700 ease-out transform"
                            :data-role-id="role.title.replace(/\s+/g, '-').toLowerCase()" :class="visibleRoles[role.title.replace(/\s+/g, '-').toLowerCase()]
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'">
                            <!-- Icon positioned over the border line -->
                            <div
                                class="absolute left-[-9px] top-2 w-4 h-4 rounded-full bg-white border-2 border-blue-900 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-blue-900" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 2v20m10-10H2" />
                                </svg>
                            </div>
                            <div class="pl-4">
                                <p class="font-medium">{{ role.title }}</p>
                                <p class="text-gray-700 text-sm">{{ role.period }}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>