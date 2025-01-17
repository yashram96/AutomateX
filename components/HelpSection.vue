<template>
  <div class="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow">
    <div class="p-6">
      <div class="lg:grid lg:grid-cols-3 lg:gap-8">
        <div>
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Need Help?</h3>
          <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <p>Get started quickly with our comprehensive resources and support options.</p>
          </div>
        </div>
        <div class="mt-12 lg:col-span-2 lg:mt-0">
          <dl class="space-y-12">
            <div v-for="item in helpItems" :key="item.name" class="relative">
              <dt>
                <component :is="item.icon" class="absolute h-6 w-6 text-primary-600" aria-hidden="true" />
                <p class="ml-9 text-sm font-semibold leading-6 text-gray-900 dark:text-white">{{ item.name }}</p>
              </dt>
              <dd class="mt-2 ml-9 text-sm text-gray-500 dark:text-gray-400">{{ item.description }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AcademicCapIcon, ChatBubbleLeftRightIcon, DocumentTextIcon } from '@heroicons/vue/24/outline'

const helpItems = [
  {
    name: 'Video Tutorials',
    description: 'Learn through step-by-step video guides covering basic to advanced automation concepts.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Live Support',
    description: 'Connect with our support team for real-time assistance with your automation needs.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Documentation',
    description: 'Access our comprehensive documentation for detailed guides and references.',
    icon: DocumentTextIcon,
  },
]
</script>