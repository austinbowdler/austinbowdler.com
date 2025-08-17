<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive } from 'vue'

type Role = { title: string; dates: string; bullets: string[] }
type Experience = { company: string; location: string; roles: Role[] }

const experiences: Experience[] = [
    {
        company: 'AlignRx',
        location: 'Edmond, OK',
        roles: [
            {
                title: 'Software Development Manager',
                dates: '08/2024 – Present',
                bullets: [
                    'Managing development teams delivering business-critical pharmacy tools.'
                ]
            },
            {
                title: 'Senior Software Engineer',
                dates: '01/2023 – 08/2024',
                bullets: [
                    'Designed and maintained business-critical applications.',
                    'Mentored junior developers and participated in code reviews.',
                    'Collaborated with stakeholders to clarify requirements and resolve design issues.'
                ]
            },
            {
                title: 'Software Engineer',
                dates: '01/2022 – 01/2023',
                bullets: [
                    'Developed and maintained complex enterprise applications.',
                    'Performed unit testing and participated in technical reviews.'
                ]
            }
        ]
    },
    {
        company: 'PPOk',
        location: 'Edmond, OK',
        roles: [
            {
                title: 'Software Developer II',
                dates: '01/2020 – 01/2022',
                bullets: [
                    'Led development and maintenance of proprietary .NET systems.',
                    'Collaborated with business customers to develop new solutions.'
                ]
            },
            {
                title: 'Software Developer I',
                dates: '01/2018 – 01/2020',
                bullets: [
                    'Implemented and maintained internal software systems.',
                    'Created high-quality code meeting specifications and standards.'
                ]
            },
            {
                title: 'Software Development Intern',
                dates: '06/2014 – 01/2018',
                bullets: [
                    'Developed and tested enterprise-level applications.',
                    'Designed and implemented database objects for efficiency.'
                ]
            }
        ]
    }
]

// track which items are visible; keys are "expIndex-roleIndex"
const visible = reactive<Record<string, boolean>>({})

let observer: IntersectionObserver | null = null

onMounted(() => {
    // respect reduced motion: if user prefers reduced motion, mark all visible
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq && mq.matches) {
        // mark every role visible so there's no animation
        experiences.forEach((exp, expIndex) => {
            exp.roles.forEach((_, roleIndex) => {
                visible[`${expIndex}-${roleIndex}`] = true
            })
        })
        return
    }

    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id = (entry.target as HTMLElement).dataset.timelineId
            if (!id) return
            if (entry.isIntersecting) {
                visible[id] = true
                // animate once
                observer?.unobserve(entry.target)
            }
        })
    }, { threshold: 0.12 })

    // observe all elements that have a data-timeline-id attribute
    const els = document.querySelectorAll('[data-timeline-id]')
    els.forEach(el => observer?.observe(el))
})

onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
})
</script>

<template>
    <div class="space-y-12">
        <div v-for="(exp, expIndex) in experiences" :key="exp.company" class="relative">
            <h3 class="text-xl font-bold">{{ exp.company }}</h3>
            <p class="text-sm text-slate-500 mb-4">{{ exp.location }}</p>
            <div class="space-y-6">
                <div v-for="(role, roleIndex) in exp.roles" :key="role.title"
                    :data-timeline-id="`${expIndex}-${roleIndex}`" :class="[
                        'border-l-2 border-brand-200 pl-4 transform transition-all duration-500 ease-out',
                        visible[`${expIndex}-${roleIndex}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    ]" :style="{ transitionDelay: `${roleIndex * 75}ms` }">
                    <h4 class="font-semibold">{{ role.title }}</h4>
                    <p class="text-xs text-slate-500">{{ role.dates }}</p>
                    <ul class="list-disc list-inside text-sm text-slate-700 mt-1">
                        <li v-for="b in role.bullets" :key="b">{{ b }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>