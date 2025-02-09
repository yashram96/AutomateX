<template>
  <div class="relative">
    <div class="absolute inset-0">
      <div class="h-full w-full bg-gradient-radial from-primary-100/20 to-transparent dark:from-primary-900/20">
        <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
    </div>
    <div class="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
      <div class="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
        <div class="lg:max-w-lg relative">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">{{ title }}</h2>
          <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">{{ description }}</p>
          <div class="mt-8">
            <slot name="features"></slot>
          </div>
          <!-- Decorative Elements -->
          <div class="absolute -left-4 -top-4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl -z-10"></div>
          <div class="absolute -right-8 bottom-8 w-48 h-48 bg-primary-600/10 rounded-full blur-2xl -z-10"></div>
        </div>
        <div class="mt-10 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1 relative">
          <!-- Illustration Container -->
          <div class="relative z-10 transform hover:scale-105 transition-transform duration-300">
            <slot name="illustration"></slot>
          </div>
          <!-- Decorative Background -->
          <div class="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-primary-600/5 rounded-2xl -z-10"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>