<template>
  <header class="fixed inset-x-0 top-0 z-50 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-sm border-b border-gray-200/20 dark:border-gray-800/20">
    <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <NuxtLink to="/" class="-m-1.5 p-1.5 flex items-center">
          <BoltIcon class="h-8 w-8 text-primary-600" />
          <span class="ml-2 text-xl font-bold text-gray-900 dark:text-white">AutomateX</span>
        </NuxtLink>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <NuxtLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500"
        >
          {{ item.name }}
        </NuxtLink>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-6">
        <ColorModeButton />
        <NuxtLink
          v-if="!isLoggedIn" 
          to="/auth/login"
          class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 flex items-center px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/50"
        >
          Log in
        </NuxtLink>
        <NuxtLink
          v-if="!isLoggedIn" 
          to="/auth/signup"
          class="rounded-md bg-primary-600/90 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 flex items-center"
        >
          Sign up
        </NuxtLink>
        <!-- Profile Dropdown -->
        <Menu
          v-if="isLoggedIn"
          as="div"
          class="relative"
        >
          <div>
            <MenuButton class="flex rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
              <span class="sr-only">Open user menu</span>
              <img
                class="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
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
              <MenuItem v-slot="{ active }">
                <NuxtLink
                  to="/dashboard"
                  :class="[
                    active ? 'bg-gray-100 dark:bg-gray-700' : '',
                    'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300'
                  ]"
                >
                  Dashboard
                </NuxtLink>
              </MenuItem>
              <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                <a
                  :href="item.href"
                  :class="[
                    active ? 'bg-gray-100 dark:bg-gray-700' : '',
                    'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300'
                  ]"
                >
                  {{ item.name }}
                </a>
              </MenuItem>
              <div class="border-t border-gray-200 dark:border-gray-700">
                <MenuItem v-slot="{ active }">
                  <button
                    @click="handleLogout"
                    :class="[
                      active ? 'bg-gray-100 dark:bg-gray-700' : '',
                      'block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300'
                    ]"
                  >
                    Logout
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </nav>

    <!-- Mobile menu -->
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-50" />
      <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="-m-1.5 p-1.5 flex items-center">
            <BoltIcon class="h-8 w-8 text-primary-600" />
            <span class="ml-2 text-xl font-bold text-gray-900 dark:text-white">AutomateX</span>
          </NuxtLink>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <NuxtLink
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {{ item.name }}
              </NuxtLink>
            </div>
            <div class="py-6">
              <div class="flex items-center gap-x-4 mb-4">
                <ColorModeButton />
                <button
                  v-if="isLoggedIn"
                  @click="handleLogout"
                  class="text-sm font-semibold text-gray-900 dark:text-gray-300"
                >
                  Logout
                </button>
              </div>
              <NuxtLink
                v-if="!isLoggedIn"
                to="/auth/login"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Log in
              </NuxtLink>
              <NuxtLink
                v-if="!isLoggedIn"
                to="/auth/signup"
                class="mt-2 -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-primary-600 hover:bg-primary-500"
              >
                Sign up
              </NuxtLink>
              <NuxtLink
                v-if="isLoggedIn" 
                to="/dashboard"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Dashboard
              </NuxtLink>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BoltIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useAuth } from '~/composables/useAuth'

const mobileMenuOpen = ref(false)
const { isLoggedIn, clearUser } = useAuth()
const router = useRouter()

const handleLogout = () => {
  clearUser()
  router.push('/')
}

const navigation = [
  { name: 'Features', href: '#features' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Resources', href: '#resources' },
]

const userNavigation = [
  { name: 'View Profile', href: '#' },
  { name: 'Account Settings', href: '#' },
  { name: 'Notifications', href: '#' },
  { name: 'Billing Information', href: '#' },
]
</script>