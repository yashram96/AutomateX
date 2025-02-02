<template>
  <div class="space-y-6">
    <!-- Password Change Section -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Change Password</h3>
      <form @submit.prevent="changePassword" class="mt-6 space-y-6">
        <div>
          <label for="current-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Current Password
          </label>
          <input
            type="password"
            id="current-password"
            v-model="passwordData.current"
            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label for="new-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            New Password
          </label>
          <input
            type="password"
            id="new-password"
            v-model="passwordData.new"
            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label for="confirm-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            v-model="passwordData.confirm"
            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            class="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>

    <!-- Two-Factor Authentication -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Add additional security to your account using two-factor authentication.
          </p>
        </div>
        <button
          type="button"
          @click="toggle2FA"
          :class="[
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2',
            is2FAEnabled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
          ]"
        >
          <span
            :class="[
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
              is2FAEnabled ? 'translate-x-5' : 'translate-x-0'
            ]"
          />
        </button>
      </div>
    </div>

    <!-- Active Sessions -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Active Sessions</h3>
      <div class="mt-6 space-y-4">
        <div v-for="session in activeSessions" :key="session.id" class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <component :is="session.icon" class="h-5 w-5 text-gray-400" />
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ session.device }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ session.location }} • Last active {{ session.lastActive }}
              </p>
            </div>
          </div>
          <button
            v-if="session.current"
            class="text-xs text-primary-600 font-medium"
          >
            Current Session
          </button>
          <button
            v-else
            @click="terminateSession(session.id)"
            class="text-xs text-red-600 font-medium hover:text-red-500"
          >
            Terminate
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon
} from '@heroicons/vue/24/outline'

const passwordData = ref({
  current: '',
  new: '',
  confirm: ''
})

const is2FAEnabled = ref(false)

const activeSessions = ref([
  {
    id: 1,
    device: 'MacBook Pro',
    location: 'San Francisco, CA',
    lastActive: 'Now',
    icon: ComputerDesktopIcon,
    current: true
  },
  {
    id: 2,
    device: 'iPhone 12',
    location: 'San Francisco, CA',
    lastActive: '2 hours ago',
    icon: DevicePhoneMobileIcon,
    current: false
  },
  {
    id: 3,
    device: 'iPad Pro',
    location: 'New York, NY',
    lastActive: '3 days ago',
    icon: DeviceTabletIcon,
    current: false
  }
])

const changePassword = () => {
  // Validate and change password
  if (passwordData.value.new !== passwordData.value.confirm) {
    alert('Passwords do not match')
    return
  }
  console.log('Changing password...')
}

const toggle2FA = () => {
  is2FAEnabled.value = !is2FAEnabled.value
  console.log('2FA enabled:', is2FAEnabled.value)
}

const terminateSession = (sessionId: number) => {
  // Terminate session logic
  console.log('Terminating session:', sessionId)
  activeSessions.value = activeSessions.value.filter(session => session.id !== sessionId)
}
</script>