<template>
  <NuxtPage />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity .25s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

html,
body {
  background-color: #0f172a;
  /* pick a dark shade you want */
  color-scheme: dark light;
  /* tell iOS Safari you support dark mode */
}

/* iOS safe area insets */
body {
  min-height: 100vh;
  background-color: #0f172a;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
