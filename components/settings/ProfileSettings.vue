<template>
  <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
    <div class="p-6 space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Profile Information</h2>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Update your account's profile information and email address.
        </p>
      </div>

      <form @submit.prevent="saveProfile" class="space-y-6">
        <!-- Profile Photo -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Photo
          </label>
          <div class="mt-2 flex items-center space-x-4">
            <img
              :src="profileData.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'"
              alt="Profile photo"
              class="h-12 w-12 rounded-full"
            />
            <button
              type="button"
              class="rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Change
            </button>
          </div>
        </div>

        <!-- Name -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            id="name"
            v-model="profileData.name"
            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            v-model="profileData.email"
            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <!-- Phone -->
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            v-model="profileData.phone"
            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <!-- Save Button -->
        <div class="flex justify-end">
          <button
            type="submit"
            class="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Save Changes
          </button>
        </div>
      </form>

      <!-- Danger Zone -->
      <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
        <div>
          <h3 class="text-lg font-medium text-red-600 dark:text-red-400">Danger Zone</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Once you delete your account, there is no going back. Please be certain.
          </p>
        </div>
        <div class="mt-4">
          <button
            type="button"
            @click="confirmDelete"
            class="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const profileData = ref({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  avatar: null
})

const saveProfile = () => {
  // Handle profile save
  console.log('Saving profile:', profileData.value)
}

const confirmDelete = () => {
  // Show confirmation dialog before deleting account
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    console.log('Deleting account...')
  }
}
</script>