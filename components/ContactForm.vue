<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({ name: '', email: '', message: '' })

function onSubmit() {
    // TODO: Integrate backend/email service
    alert(`Thanks, ${form.name}! Your message has been sent.`)
    form.name = ''
    form.email = ''
    form.message = ''
}
</script>

<template>
    <form @submit.prevent="onSubmit" class="max-w-lg mx-auto space-y-6">
        <div>
            <label class="block text-sm font-medium mb-1">Name</label>
            <input v-model="form.name" type="text" required class="w-full border rounded px-3 py-2" />
        </div>
        <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input v-model="form.email" type="email" required class="w-full border rounded px-3 py-2" />
        </div>
        <div>
            <label class="block text-sm font-medium mb-1">Message</label>
            <textarea v-model="form.message" rows="5" required class="w-full border rounded px-3 py-2"></textarea>
        </div>
        <button type="submit" class="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-700">
            Send Message
        </button>
    </form>
</template>