<template>
  <div>
    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Last 30 days</h3>
    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="item in stats" :key="item.name" class="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
        <dt>
          <div class="absolute rounded-md bg-primary-500 p-3">
            <component :is="item.icon" class="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <p class="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-400">{{ item.name }}</p>
        </dt>
        <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
          <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ item.stat }}</p>
          <p :class="[item.changeType === 'increase' ? 'text-green-600' : 'text-red-600', 'ml-2 flex items-baseline text-sm font-semibold']">
            <component :is="item.changeType === 'increase' ? ArrowUpIcon : ArrowDownIcon" class="h-5 w-5 flex-shrink-0 self-center" aria-hidden="true" />
            {{ item.change }}
          </p>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/20/solid'
import { PlayIcon, BoltIcon, ClockIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'

const stats = [
  { name: 'Workflows Run Today', stat: '71', change: '12%', changeType: 'increase', icon: PlayIcon },
  { name: 'Active Automations', stat: '23', change: '2.1%', changeType: 'increase', icon: BoltIcon },
  { name: 'Time Saved (hrs)', stat: '12.4', change: '4.3%', changeType: 'increase', icon: ClockIcon },
  { name: 'Success Rate', stat: '98.5%', change: '0.2%', changeType: 'decrease', icon: CheckCircleIcon },
]
</script>