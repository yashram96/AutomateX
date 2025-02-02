<template>
  <Menu as="div" class="relative">
    <MenuButton class="relative p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
      <span class="sr-only">View notifications</span>
      <BellIcon class="h-6 w-6" />
      <span
        v-if="unreadCount > 0"
        class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white"
      >
        {{ unreadCount > 99 ? '99+' : unreadCount }}
      </span>
    </MenuButton>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-96 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <!-- Header -->
        <div class="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
            <div class="flex items-center space-x-2">
              <button
                @click="markAllAsRead"
                class="text-xs text-primary-600 hover:text-primary-500"
              >
                Mark all as read
              </button>
              <Menu as="div" class="relative">
                <MenuButton class="p-1 text-gray-400 hover:text-gray-500">
                  <FunnelIcon class="h-4 w-4" />
                </MenuButton>
                <MenuItems
                  class="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem v-slot="{ active }">
                    <button
                      @click="filter = 'all'"
                      :class="[
                        active ? 'bg-gray-100 dark:bg-gray-700' : '',
                        'block px-4 py-2 text-sm w-full text-left',
                        filter === 'all' ? 'text-primary-600' : 'text-gray-700 dark:text-gray-300'
                      ]"
                    >
                      All Notifications
                    </button>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button
                      @click="filter = 'unread'"
                      :class="[
                        active ? 'bg-gray-100 dark:bg-gray-700' : '',
                        'block px-4 py-2 text-sm w-full text-left',
                        filter === 'unread' ? 'text-primary-600' : 'text-gray-700 dark:text-gray-300'
                      ]"
                    >
                      Unread Only
                    </button>
                  </MenuItem>
                  <div class="border-t border-gray-200 dark:border-gray-700">
                    <MenuItem v-for="type in notificationTypes" :key="type.value" v-slot="{ active }">
                      <button
                        @click="toggleTypeFilter(type.value)"
                        :class="[
                          active ? 'bg-gray-100 dark:bg-gray-700' : '',
                          'block px-4 py-2 text-sm w-full text-left',
                          typeFilters.includes(type.value) ? 'text-primary-600' : 'text-gray-700 dark:text-gray-300'
                        ]"
                      >
                        {{ type.label }}
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        <!-- Notifications List -->
        <div class="max-h-96 overflow-y-auto custom-scrollbar">
          <div v-if="filteredNotifications.length === 0" class="px-4 py-8 text-center">
            <BellIcon class="mx-auto h-12 w-12 text-gray-400" />
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
              No notifications to display
            </p>
          </div>
          <div v-else>
            <div
              v-for="notification in filteredNotifications"
              :key="notification.id"
              :class="[
                'relative px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50',
                !notification.read ? 'bg-primary-50 dark:bg-primary-900/20' : ''
              ]"
            >
              <!-- Category Tag -->
              <span
                :class="[
                  'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium mb-1',
                  notification.type === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                  notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  notification.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                ]"
              >
                {{ notification.type.charAt(0).toUpperCase() + notification.type.slice(1) }}
              </span>

              <!-- Title and Message -->
              <div class="flex justify-between items-start">
                <div class="flex-1 pr-8">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ notification.title }}
                  </p>
                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {{ notification.message }}
                  </p>
                  <div class="mt-2 flex items-center space-x-4">
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                      {{ formatTime(notification.timestamp) }}
                    </span>
                    <button
                      v-if="notification.action"
                      @click="handleAction(notification)"
                      class="text-xs text-primary-600 hover:text-primary-500"
                    >
                      {{ notification.action.label }}
                    </button>
                  </div>
                </div>

                <!-- Dismiss Button -->
                <button
                  @click="dismissNotification(notification.id)"
                  class="absolute top-3 right-4 text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="border-t border-gray-200 dark:border-gray-700 px-4 py-2">
          <NuxtLink
            to="/notifications"
            class="block text-center text-sm text-primary-600 hover:text-primary-500"
          >
            View All Notifications
          </NuxtLink>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, XMarkIcon, FunnelIcon } from '@heroicons/vue/24/outline'
import { useNotifications } from '~/composables/useNotifications'

const { notifications, markAsRead, dismiss, markAllAsRead: markAllNotificationsAsRead } = useNotifications()

const filter = ref<'all' | 'unread'>('all')
const typeFilters = ref<string[]>([])

const notificationTypes = [
  { value: 'error', label: 'Errors' },
  { value: 'warning', label: 'Warnings' },
  { value: 'success', label: 'Success' },
  { value: 'info', label: 'Info' },
]

const toggleTypeFilter = (type: string) => {
  const index = typeFilters.value.indexOf(type)
  if (index === -1) {
    typeFilters.value.push(type)
  } else {
    typeFilters.value.splice(index, 1)
  }
}

const filteredNotifications = computed(() => {
  let filtered = [...notifications.value]
  
  // Apply unread filter
  if (filter.value === 'unread') {
    filtered = filtered.filter(n => !n.read)
  }
  
  // Apply type filters
  if (typeFilters.value.length > 0) {
    filtered = filtered.filter(n => typeFilters.value.includes(n.type))
  }
  
  return filtered
})

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

const formatTime = (timestamp: string | number) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  // Less than 1 minute
  if (diff < 60000) {
    return 'Just now'
  }
  
  // Less than 1 hour
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000)
    return `${minutes}m ago`
  }
  
  // Less than 1 day
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000)
    return `${hours}h ago`
  }
  
  // Less than 7 days
  if (diff < 604800000) {
    const days = Math.floor(diff / 86400000)
    return `${days}d ago`
  }
  
  // Format as date
  return date.toLocaleDateString()
}

const dismissNotification = (id: string) => {
  dismiss(id)
}

const markAllAsRead = () => {
  markAllNotificationsAsRead()
}

const handleAction = (notification: any) => {
  if (notification.action?.handler) {
    notification.action.handler()
  }
  markAsRead(notification.id)
}
</script>