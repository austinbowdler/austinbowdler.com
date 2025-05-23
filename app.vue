<template>
  <div class="min-h-screen bg-white text-gray-900 font-sans overflow-y-auto scroll-snap-y snap-mandatory">
    <HeroSection />
    <AboutSection />
    <WorkHistorySection />
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import WorkHistorySection from '@/components/WorkHistorySection.vue'
import ContactSection from '@/components/ContactSection.vue'
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

div {
  scroll-snap-type: y mandatory;
}

section {
  scroll-snap-align: start;
}
</style>