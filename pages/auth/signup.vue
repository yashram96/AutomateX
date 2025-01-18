<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="flex justify-center">
          <BoltIcon class="h-12 w-12 text-primary-600" />
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Start automating your workflows today
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSignup">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="name" class="sr-only">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              v-model="name"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-800 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Full name"
            />
          </div>
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              v-model="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              v-model="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div>
            <label for="confirm-password" class="sr-only">Confirm password</label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              v-model="confirmPassword"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-800 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Confirm password"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              v-model="acceptTerms"
              required
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-700 rounded"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              I agree to the
              <NuxtLink to="/terms" class="font-medium text-primary-600 hover:text-primary-500">
                Terms of Service
              </NuxtLink>
              and
              <NuxtLink to="/privacy" class="font-medium text-primary-600 hover:text-primary-500">
                Privacy Policy
              </NuxtLink>
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="!isFormValid"
            :class="[
              'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white',
              isFormValid 
                ? 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                : 'bg-gray-400 cursor-not-allowed'
            ]"
          >
            Create account
          </button>
        </div>
      </form>

      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?
          <NuxtLink to="/auth/login" class="font-medium text-primary-600 hover:text-primary-500">
            Sign in
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BoltIcon } from '@heroicons/vue/24/outline'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptTerms = ref(false)

const isFormValid = computed(() => {
  return (
    name.value.length > 0 &&
    email.value.length > 0 &&
    password.value.length >= 8 &&
    password.value === confirmPassword.value &&
    acceptTerms.value
  )
})

const handleSignup = () => {
  if (!isFormValid.value) return

  // TODO: Implement actual signup logic
  const user = useState('user')
  user.value = { name: name.value, email: email.value }
  navigateTo('/dashboard')
}
</script>