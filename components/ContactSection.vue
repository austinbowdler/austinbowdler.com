<script setup lang="ts">
import { ref, onMounted } from 'vue'

const visible = ref(false)

onMounted(() => {
    visible.value = true
})
</script>

<template>
    <section id="contact"
        class="min-h-screen flex items-center justify-center px-8 bg-gray-50 transition-all duration-700 ease-out transform"
        :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'">
        <div class="w-full max-w-lg">
            <h2 class="text-3xl font-bold text-center mb-6">Contact Me</h2>
            <p class="text-center text-gray-700">
                Please send me an email at
                <a href="mailto:austin@austinbowdler.com" class="text-blue-900">austin@austinbowdler.com</a>.
            </p>
        </div>
    </section>
</template>