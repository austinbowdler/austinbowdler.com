<template>
  <AuroraBackground />
  <ScrollProgress />
  <NuxtPage />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity .3s ease, transform .3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

html,
body {
  background-color: #0f172a;
  color-scheme: dark light;
}

html:not(.dark),
html:not(.dark) body {
  background-color: #f6fafb;
}

body {
  min-height: 100vh;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}

/* Custom selection color */
::selection {
  background: rgba(67, 140, 164, 0.35);
  color: inherit;
}
</style>
