<script setup lang="ts">
import { ref, onMounted } from 'vue'

const visible = ref(false)

onMounted(() => {
  // Trigger the animation once the component is mounted
  visible.value = true
})
</script>

<template>
  <section
    class="h-screen flex items-center justify-center bg-gradient-to-br from-teal-200 to-blue-900 text-white px-4"
  >
    <div
      class="text-center space-y-4 transition-all duration-700 ease-out transform"
      :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
    >
      <h1 class="text-5xl font-extrabold">Austin Bowdler</h1>
      <p class="text-xl">Web Software Developer & Designer</p>
    </div>
  </section>
</template>
