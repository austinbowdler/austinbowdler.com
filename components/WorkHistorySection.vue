<script setup lang="ts">
interface Role { title: string; period: string; }
interface Entry { company: string; location: string; date: string; roles: Role[]; }

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
</script>

<template>
    <section id="work-history" class="min-h-screen px-8 py-12 bg-gray-100">
        <h2 class="text-3xl font-bold text-center mb-8">Work History</h2>
        <div class="space-y-12">
            <div v-for="entry in timeline" :key="entry.company" class="flex items-start">
                <div class="w-1/4 text-right pr-6">
                    <p class="text-gray-600">{{ entry.date }}</p>
                </div>
                <div class="w-3/4 pl-6 border-l-2 border-blue-900">
                    <h3 class="text-xl font-semibold">
                        {{ entry.company }} <span class="text-gray-500">| {{ entry.location }}</span>
                    </h3>
                    <ul class="mt-4 space-y-4">
                        <li v-for="role in entry.roles" :key="role.title">
                            <p class="font-medium">{{ role.title }}</p>
                            <p class="text-gray-700 text-sm">{{ role.period }}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>