<template>
  <div class="space-y-1">
    <button
      v-for="item in navigationItems"
      :key="item.name"
      :class="[
        'flex items-center w-full px-3 py-2 text-sm font-medium rounded-md',
        activeSection === item.id
          ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
      ]"
      @click="$emit('update:section', item.id)"
    >
      <component 
        :is="item.icon" 
        :class="[
          'mr-3 h-5 w-5',
          activeSection === item.id
            ? 'text-primary-500'
            : 'text-gray-400 dark:text-gray-500'
        ]"
      />
      {{ item.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  UserIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  PuzzlePieceIcon,
  KeyIcon,
  UserGroupIcon,
  BellIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps<{
  activeSection: string
}>()

defineEmits(['update:section'])

const navigationItems = [
  { id: 'profile', name: 'Profile', icon: UserIcon },
  { id: 'security', name: 'Security', icon: ShieldCheckIcon },
  { id: 'billing', name: 'Billing', icon: CreditCardIcon },
  { id: 'integrations', name: 'Integrations', icon: PuzzlePieceIcon },
  { id: 'environment', name: 'Environment Variables', icon: KeyIcon },
  { id: 'team', name: 'Team', icon: UserGroupIcon },
  { id: 'notifications', name: 'Notifications', icon: BellIcon },
]
</script>