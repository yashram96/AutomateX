<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
body {
  @apply bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100;
}

.custom-scrollbar {
  scrollbar-width: 6px;
  scrollbar-color: rgba(0, 119, 255, 0.3) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  background-color: rgba(0, 119, 255, 0.3);
  border-radius: 20px;
  border: 2px solid transparent;
  background-clip: padding-box;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 119, 255, 0.5);
}

.dark .custom-scrollbar {
  scrollbar-color: rgba(0, 119, 255, 0.5) transparent;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(0, 119, 255, 0.3);
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 119, 255, 0.5);
}
</style>