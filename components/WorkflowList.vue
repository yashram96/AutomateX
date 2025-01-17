<template>
  <div class="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow">
    <div class="p-6">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Recent Workflows</h3>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <select class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 dark:text-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6">
            <option>Most Recent</option>
            <option>Most Used</option>
            <option>Favorites</option>
          </select>
        </div>
      </div>
      <div class="mt-6 flow-root">
        <ul role="list" class="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
          <li v-for="workflow in workflows" :key="workflow.name" class="py-5">
            <div class="relative flex items-center space-x-4">
              <div class="flex-shrink-0">
                <span class="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900">
                  <component :is="workflow.icon" class="h-6 w-6 text-primary-700 dark:text-primary-300" aria-hidden="true" />
                </span>
              </div>
              <div class="min-w-0 flex-1">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ workflow.name }}</h4>
                <p class="truncate text-sm text-gray-500 dark:text-gray-400">{{ workflow.description }}</p>
              </div>
              <div class="flex flex-shrink-0 space-x-2">
                <button type="button" class="rounded-md bg-white dark:bg-gray-800 p-2 text-gray-400 hover:text-gray-500">
                  <PlayIcon class="h-5 w-5" />
                </button>
                <button type="button" class="rounded-md bg-white dark:bg-gray-800 p-2 text-gray-400 hover:text-gray-500">
                  <PencilIcon class="h-5 w-5" />
                </button>
                <button type="button" class="rounded-md bg-white dark:bg-gray-800 p-2 text-gray-400 hover:text-gray-500">
                  <DocumentDuplicateIcon class="h-5 w-5" />
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlayIcon, PencilIcon, DocumentDuplicateIcon } from '@heroicons/vue/24/outline'
import { BoltIcon, EnvelopeIcon, CalendarIcon } from '@heroicons/vue/24/outline'

const workflows = [
  {
    name: 'Daily Data Sync',
    description: 'Syncs data between CRM and marketing platforms every day at 9 AM',
    icon: BoltIcon,
  },
  {
    name: 'Email Campaign Automation',
    description: 'Triggers personalized email sequences based on user actions',
    icon: EnvelopeIcon,
  },
  {
    name: 'Calendar Integration',
    description: 'Automatically schedules meetings and sends reminders',
    icon: CalendarIcon,
  },
]
</script>