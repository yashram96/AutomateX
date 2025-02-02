<template>
  <div class="space-y-6">
    <!-- Email Notifications -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Email Notifications</h3>
      <div class="mt-6 space-y-6">
        <div v-for="(group, groupName) in emailNotifications" :key="groupName" class="space-y-4">
          <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ groupName }}</h4>
          <div class="space-y-4">
            <div v-for="notification in group" :key="notification.id" class="flex items-start">
              <div class="flex h-6 items-center">
                <input
                  :id="notification.id"
                  v-model="notification.enabled"
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-600"
                />
              </div>
              <div class="ml-3">
                <label :for="notification.id" class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {{ notification.name }}
                </label>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ notification.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Push Notifications -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Push Notifications</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Receive notifications directly in your browser
          </p>
        </div>
        <button
          type="button"
          @click="togglePushNotifications"
          :class="[
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2',
            pushNotificationsEnabled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
          ]"
        >
          <span
            :class="[
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
              pushNotificationsEnabled ? 'translate-x-5' : 'translate-x-0'
            ]"
          />
        </button>
      </div>
    </div>

    <!-- Slack Integration -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Slack Integration</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Receive notifications in your Slack workspace
          </p>
        </div>
        <button
          v-if="!slackConnected"
          @click="connectSlack"
          class="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
        >
          Connect Slack
        </button>
        <button
          v-else
          @click="disconnectSlack"
          class="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          Disconnect
        </button>
      </div>
      <div v-if="slackConnected" class="mt-6">
        <div class="space-y-4">
          <div v-for="channel in slackChannels" :key="channel.id" class="flex items-start">
            <div class="flex h-6 items-center">
              <input
                :id="channel.id"
                v-model="channel.enabled"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-600"
              />
            </div>
            <div class="ml-3">
              <label :for="channel.id" class="text-sm font-medium text-gray-700 dark:text-gray-300">
                #{{ channel.name }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emailNotifications = ref({
  'Workflow Notifications': [
    {
      id: 'workflow-success',
      name: 'Workflow Success',
      description: 'Get notified when a workflow completes successfully',
      enabled: true
    },
    {
      id: 'workflow-failure',
      name: 'Workflow Failure',
      description: 'Get notified when a workflow fails',
      enabled: true
    },
    {
      id: 'workflow-changes',
      name: 'Workflow Changes',
      description: 'Get notified when someone modifies a workflow',
      enabled: false
    }
  ],
  'Account Notifications': [
    {
      id: 'security-alerts',
      name: 'Security Alerts',
      description: 'Get notified about important security events',
      enabled: true
    },
    {
      id: 'billing-alerts',
      name: 'Billing Alerts',
      description: 'Get notified about billing and subscription updates',
      enabled: true
    }
  ],
  'Team Notifications': [
    {
      id: 'team-changes',
      name: 'Team Changes',
      description: 'Get notified when team members are added or removed',
      enabled: true
    },
    {
      id: 'role-changes',
      name: 'Role Changes',
      description: 'Get notified when team member roles are changed',
      enabled: false
    }
  ]
})

const pushNotificationsEnabled = ref(false)
const slackConnected = ref(false)
const slackChannels = ref([
  { id: 'general', name: 'general', enabled: true },
  { id: 'automation', name: 'automation', enabled: true },
  { id: 'alerts', name: 'alerts', enabled: false }
])

const togglePushNotifications = () => {
  if (!pushNotificationsEnabled.value) {
    // Request notification permissions
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        pushNotificationsEnabled.value = permission === 'granted'
      })
    }
  } else {
    pushNotificationsEnabled.value = false
  }
}

const connectSlack = () => {
  // Implement Slack OAuth flow
  slackConnected.value = true
}

const disconnectSlack = () => {
  if (confirm('Are you sure you want to disconnect Slack?')) {
    slackConnected.value = false
  }
}
</script>