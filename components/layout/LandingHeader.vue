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
          to="/auth/login"
          class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 flex items-center px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/50"
        >
          Log in
        </NuxtLink>
        <NuxtLink
          to="/auth/signup"
          class="rounded-md bg-primary-600/90 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 flex items-center"
        >
          Sign up
        </NuxtLink>
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
              </div>
              <NuxtLink
                to="/auth/login"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Log in
              </NuxtLink>
              <NuxtLink
                to="/auth/signup"
                class="mt-2 -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-primary-600 hover:bg-primary-500"
              >
                Sign up
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
import { Dialog, DialogPanel } from '@headlessui/vue'
import { BoltIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const mobileMenuOpen = ref(false)

const navigation = [
  { name: 'Features', href: '#features' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Resources', href: '#resources' },
]
</script>