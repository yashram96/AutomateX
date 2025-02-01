<template>
  <header class="fixed top-0 left-0 right-0 z-40 bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800/50 backdrop-blur-sm">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <button
            type="button"
            class="inline-flex items-center p-2 rounded-md text-gray-700 lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            @click="$emit('toggle-sidebar')"
          >
            <span class="sr-only">Open sidebar</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
          <div class="flex-shrink-0 flex items-center">
            <BoltIcon class="h-8 w-8 text-primary-600" />
            <span class="ml-2 text-xl font-bold text-gray-900 dark:text-white">AutomateX</span>
          </div>
        </div>

        <!-- Search -->
        <div class="hidden md:block flex-shrink-0 w-72 lg:w-96 mx-4">
          <div class="flex items-center">
            <div class="w-full">
              <label for="search" class="sr-only">Search</label>
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 opacity-60">
                  <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  class="block w-full rounded-md border-0 bg-white/10 dark:bg-gray-800/30 py-1.5 pl-10 pr-3 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-200 dark:ring-gray-700/50 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500/50 sm:text-sm sm:leading-6 backdrop-blur-sm transition-all duration-200 hover:bg-white/20 dark:hover:bg-gray-800/40 focus:bg-white/30 dark:focus:bg-gray-800/50"
                  placeholder="Search..."
                  type="search"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Links and Profile -->
        <div class="flex items-center space-x-4 flex-shrink-0">
          <nav class="hidden md:flex space-x-4">
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              {{ item.name }}
            </NuxtLink>
          </nav>

          <!-- Notifications -->
          <button class="relative p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <BellIcon class="h-6 w-6" />
            <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-gray-800" />
          </button>

          <!-- Profile Dropdown -->
          <Menu as="div" class="relative">
            <div>
              <MenuButton class="flex rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                  <a
                    :href="item.href"
                    :class="[
                      active ? 'bg-gray-100 dark:bg-gray-700' : '',
                      'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300',
                    ]"
                    @click="item.name === 'Logout' ? handleLogout() : null"
                  >
                    {{ item.name }}
                  </a>
                </MenuItem>
                <div class="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                  <ColorModeButton />
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {
  BellIcon,
  BoltIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline'
import { useAuth } from '~/composables/useAuth'

const { clearUser } = useAuth()
const router = useRouter()

const handleLogout = () => {
  clearUser()
  router.push('/')
}

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Templates', href: '/templates' },
  { name: 'Integrations', href: '/integrations' },
  { name: 'Activity Logs', href: '/logs' },
]

const userNavigation = [
  { name: 'View Profile', href: '#' },
  { name: 'Account Settings', href: '#' },
  { name: 'Notifications', href: '#' },
  { name: 'Billing Information', href: '#' },
  { name: 'Logout', href: 'javascript:void(0)' },
]

defineEmits(['toggle-sidebar'])
</script>