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
                title: 'Director of Software Development',
                dates: '08/2024 – Present',
                bullets: [
                    'Managing development teams delivering business-critical pharmacy tools.',
                ],
            },
            {
                title: 'Senior Software Engineer',
                dates: '01/2023 – 08/2024',
                bullets: [
                    'Designed and maintained business-critical applications.',
                    'Mentored junior developers and participated in code reviews.',
                    'Collaborated with stakeholders to clarify requirements and resolve design issues.',
                ],
            },
            {
                title: 'Software Engineer',
                dates: '01/2022 – 01/2023',
                bullets: [
                    'Developed and maintained complex enterprise applications.',
                    'Performed unit testing and participated in technical reviews.',
                ],
            },
        ],
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
                    'Collaborated with business customers to develop new solutions.',
                ],
            },
            {
                title: 'Software Developer I',
                dates: '01/2018 – 01/2020',
                bullets: [
                    'Implemented and maintained internal software systems.',
                    'Created high-quality code meeting specifications and standards.',
                ],
            },
            {
                title: 'Software Development Intern',
                dates: '06/2014 – 01/2018',
                bullets: [
                    'Developed and tested enterprise-level applications.',
                    'Designed and implemented database objects for efficiency.',
                ],
            },
        ],
    },
]

const visible = reactive<Record<string, boolean>>({})
let observer: IntersectionObserver | null = null

onMounted(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
        experiences.forEach((exp, i) => {
            exp.roles.forEach((_, j) => (visible[`${i}-${j}`] = true))
        })
        return
    }

    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const id = (entry.target as HTMLElement).dataset.timelineId
                if (!id) return
                if (entry.isIntersecting) {
                    visible[id] = true
                    observer?.unobserve(entry.target)
                }
            })
        },
        { threshold: 0.15 }
    )

    document.querySelectorAll('[data-timeline-id]').forEach((el) => observer?.observe(el))
})

onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
})
</script>

<template>
    <div class="space-y-14">
        <div v-for="(exp, i) in experiences" :key="exp.company" class="relative">
            <div class="flex items-baseline justify-between flex-wrap gap-2">
                <h3 class="company-name">{{ exp.company }}</h3>
                <span class="location">{{ exp.location }}</span>
            </div>
            <div class="timeline">
                <div v-for="(role, j) in exp.roles" :key="role.title" :data-timeline-id="`${i}-${j}`" class="timeline-item"
                    :class="visible[`${i}-${j}`] ? 'is-visible' : ''"
                    :style="{ transitionDelay: `${j * 90}ms` }">
                    <div class="dot" />
                    <div class="role">
                        <div class="flex items-center justify-between flex-wrap gap-2">
                            <h4 class="role-title">{{ role.title }}</h4>
                            <span class="role-dates">{{ role.dates }}</span>
                        </div>
                        <ul class="role-bullets">
                            <li v-for="b in role.bullets" :key="b">{{ b }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.company-name {
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    background: linear-gradient(135deg, #66aebf, #438ca4);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.location {
    font-size: 0.8rem;
    color: rgb(100 116 139);
}

.timeline {
    position: relative;
    margin-top: 1.25rem;
    padding-left: 1.5rem;
}

.timeline::before {
    content: '';
    position: absolute;
    top: 6px;
    bottom: 6px;
    left: 5px;
    width: 2px;
    background: linear-gradient(180deg, #66aebf 0%, #438ca4 50%, transparent 100%);
    border-radius: 2px;
    opacity: 0.6;
}

.timeline-item {
    position: relative;
    padding: 0.25rem 0 1.1rem 0.5rem;
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 600ms ease, transform 600ms cubic-bezier(.2, .8, .2, 1);
}

.timeline-item.is-visible {
    opacity: 1;
    transform: translateY(0);
}

.dot {
    position: absolute;
    left: -1.35rem;
    top: 0.55rem;
    width: 12px;
    height: 12px;
    border-radius: 9999px;
    background: #438ca4;
    box-shadow: 0 0 0 4px rgba(67, 140, 164, 0.18), 0 0 18px rgba(67, 140, 164, 0.45);
}

.timeline-item.is-visible .dot {
    animation: dot-pulse 2.4s ease-in-out infinite;
}

@keyframes dot-pulse {

    0%,
    100% {
        box-shadow: 0 0 0 4px rgba(67, 140, 164, 0.18), 0 0 18px rgba(67, 140, 164, 0.45);
    }

    50% {
        box-shadow: 0 0 0 6px rgba(67, 140, 164, 0.08), 0 0 24px rgba(67, 140, 164, 0.65);
    }
}

.role-title {
    font-weight: 600;
    color: rgb(15 23 42);
}

.role-dates {
    font-size: 0.72rem;
    color: rgb(100 116 139);
    padding: 2px 8px;
    border-radius: 9999px;
    background: rgba(102, 174, 191, 0.12);
    border: 1px solid rgba(102, 174, 191, 0.25);
}

.role-bullets {
    list-style: disc;
    list-style-position: inside;
    margin-top: 0.35rem;
    font-size: 0.875rem;
    color: rgb(71 85 105);
    line-height: 1.6;
}
</style>

<style>
html.dark .role-title {
    color: rgb(241 245 249);
}

html.dark .role-bullets {
    color: rgb(203 213 225);
}
</style>
