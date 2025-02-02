<template>
  <div class="flex flex-col h-full">
    <nav class="flex-1 space-y-1 py-4 px-4 overflow-y-auto custom-scrollbar">
        <div v-for="section in navigation" :key="section.name" class="space-y-1">
          <div
            v-if="section.name"
            :class="[
              'text-xs font-semibold leading-6 text-gray-400 transition-all duration-300',
              isCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
            ]"
          >
            {{ section.name }}
          </div>
          <div class="space-y-1">
            <template v-for="item in section.items" :key="item.name">
              <!-- If item has children -->
              <Disclosure
                v-if="item.children && !isCollapsed"
                v-slot="{ open }"
                :defaultOpen="false"
              >
                <DisclosureButton
                  class="flex w-full items-center gap-x-3 rounded-md p-2 text-sm leading-6 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  :class="{ 'bg-gray-50 dark:bg-gray-700': open }"
                >
                  <component :is="item.icon" class="h-5 w-5 shrink-0" />
                  {{ item.name }}
                  <ChevronRightIcon
                    class="ml-auto h-4 w-4 shrink-0 transition-transform"
                    :class="{ 'rotate-90': open }"
                  />
                </DisclosureButton>
                <DisclosurePanel class="mt-1 space-y-1 px-4">
                  <NuxtLink
                    v-for="child in item.children"
                    :key="child.name"
                    :to="child.href"
                    class="block rounded-md py-2 pl-9 pr-2 text-sm leading-6 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {{ child.name }}
                  </NuxtLink>
                </DisclosurePanel>
              </Disclosure>

              <!-- Collapsed state for items with children -->
              <button
                v-else-if="item.children && isCollapsed"
                class="flex w-full items-center justify-center rounded-md p-2 text-sm leading-6 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <component :is="item.icon" class="h-5 w-5 shrink-0" />
              </button>

              <!-- If item has no children -->
              <NuxtLink
                v-else
                :class="[
                  'flex rounded-md p-2 text-sm leading-6 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700',
                  isCollapsed ? 'justify-center w-10' : 'items-center gap-x-3'
                ]"
                :to="item.href"
              >
                <component :is="item.icon" class="h-5 w-5 shrink-0" />
                <span
                  :class="[
                    'transition-all duration-300',
                    isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                  ]"
                >
                  {{ item.name }}
                </span>
              </NuxtLink>
            </template>
          </div>
        </div>
      </nav>

      <!-- Help Center Button -->
      <div class="sticky bottom-0 left-0 right-0 flex-shrink-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          :class="[
            'flex rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500',
            isCollapsed ? 'justify-center' : 'w-full items-center gap-x-3'
          ]"
        >
          <QuestionMarkCircleIcon class="h-5 w-5" />
          <span
            :class="[
              'transition-all duration-300',
              isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
            ]"
          >
            Help Center
          </span>
        </button>
      </div>
  </div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import {
  HomeIcon,
  BoltIcon,
  PuzzlePieceIcon,
  RectangleStackIcon,
  ClockIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ChevronRightIcon,
  QuestionMarkCircleIcon as SupportIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps<{
  isCollapsed?: boolean
}>()

const navigation = [
  {
    items: [
      { name: 'Dashboard', href: '/', icon: HomeIcon },
    ],
  },
  {
    name: 'Workflows',
    items: [
      {
        name: 'Workflows',
        icon: BoltIcon,
        children: [
          { name: 'My Workflows', href: '/workflows/my' },
          { name: 'Team Workflows', href: '/workflows/team' },
        ],
      },
    ],
  },
  {
    name: 'Resources',
    items: [
      {
        name: 'Integrations',
        icon: PuzzlePieceIcon,
        children: [
          { name: 'API Configurations', href: '/integrations/api' },
          { name: 'Connected Apps', href: '/integrations/apps' },
        ],
      },
      {
        name: 'Templates',
        icon: RectangleStackIcon,
        children: [
          { name: 'Prebuilt Templates', href: '/templates/prebuilt' },
          { name: 'Create New Template', href: '/templates/new' },
        ],
      },
    ],
  },
  {
    name: 'Monitoring',
    items: [
      { name: 'Activity Logs', href: '/logs', icon: ClockIcon },
      {
        name: 'Reports',
        icon: ChartBarIcon,
        children: [
          { name: 'Workflow Usage', href: '/reports/usage' },
          { name: 'Performance Metrics', href: '/reports/performance' },
        ],
      },
    ],
  },
  {
    name: 'Settings & Support',
    items: [
      { name: 'Settings', href: '/settings/account', icon: Cog6ToothIcon },
      {
        name: 'Support',
        icon: SupportIcon,
        children: [
          { name: 'FAQs', href: '/support/faqs' },
          { name: 'Contact Support', href: '/support/contact' },
        ],
      },
    ],
  },
]
</script>