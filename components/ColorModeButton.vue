<template>
  <button
    @click="toggleColorMode"
    class="rounded-lg bg-gray-200 p-2.5 text-gray-500 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
  >
    <SunIcon v-if="colorMode === 'dark'" class="h-5 w-5" />
    <MoonIcon v-else class="h-5 w-5" />
  </button>
</template>

<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
const colorMode = useColorMode()
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>