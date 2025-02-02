<template>
  <div class="space-y-6">
    <!-- Current Plan -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Current Plan</h3>
      <div class="mt-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-900 dark:text-white">Pro Plan</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">$49/month</p>
          </div>
          <button
            type="button"
            class="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
          >
            Upgrade Plan
          </button>
        </div>
        <div class="mt-4">
          <div class="flex items-center space-x-2">
            <CheckIcon class="h-5 w-5 text-green-500" />
            <span class="text-sm text-gray-600 dark:text-gray-300">Unlimited Workflows</span>
          </div>
          <div class="flex items-center space-x-2 mt-2">
            <CheckIcon class="h-5 w-5 text-green-500" />
            <span class="text-sm text-gray-600 dark:text-gray-300">Advanced Integrations</span>
          </div>
          <div class="flex items-center space-x-2 mt-2">
            <CheckIcon class="h-5 w-5 text-green-500" />
            <span class="text-sm text-gray-600 dark:text-gray-300">Priority Support</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Methods -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Payment Methods</h3>
      <div class="mt-4 space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <CreditCardIcon class="h-8 w-8 text-gray-400" />
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Expires 12/24</p>
            </div>
          </div>
          <button
            type="button"
            class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            Edit
          </button>
        </div>
      </div>
      <div class="mt-6">
        <button
          type="button"
          class="text-sm text-primary-600 hover:text-primary-500 font-medium"
        >
          + Add Payment Method
        </button>
      </div>
    </div>

    <!-- Billing History -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Billing History</h3>
      <div class="mt-4">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Invoice</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="invoice in billingHistory" :key="invoice.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{{ invoice.date }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${{ invoice.amount }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  invoice.status === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                ]">
                  {{ invoice.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 hover:text-primary-500">
                <a href="#" class="font-medium">Download</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CheckIcon, CreditCardIcon } from '@heroicons/vue/24/outline'

const billingHistory = ref([
  {
    id: 1,
    date: 'Apr 1, 2024',
    amount: '49.00',
    status: 'Paid'
  },
  {
    id: 2,
    date: 'Mar 1, 2024',
    amount: '49.00',
    status: 'Paid'
  },
  {
    id: 3,
    date: 'Feb 1, 2024',
    amount: '49.00',
    status: 'Paid'
  }
])
</script>