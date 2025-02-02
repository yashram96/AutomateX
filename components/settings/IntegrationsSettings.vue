<template>
  <div class="space-y-6">
    <!-- Connected Apps -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Connected Applications</h3>
      <div class="mt-6 space-y-6">
        <div v-for="app in connectedApps" :key="app.id" class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <img :src="app.icon" :alt="app.name" class="h-8 w-8 rounded-lg" />
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ app.name }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Connected {{ app.connectedDate }}</p>
            </div>
          </div>
          <button
            @click="disconnectApp(app.id)"
            class="text-sm text-red-600 hover:text-red-500 font-medium"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>

    <!-- Available Integrations -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Available Integrations</h3>
      <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div v-for="integration in availableIntegrations" :key="integration.id" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-5 shadow-sm hover:border-primary-500">
          <div class="flex-shrink-0">
            <img :src="integration.icon" :alt="integration.name" class="h-10 w-10 rounded-lg" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium text-gray-900 dark:text-white">{{ integration.name }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ integration.description }}</p>
          </div>
          <button
            @click="connectIntegration(integration.id)"
            class="ml-4 inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const connectedApps = ref([
  {
    id: 1,
    name: 'Slack',
    icon: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg',
    connectedDate: 'Jan 15, 2024'
  },
  {
    id: 2,
    name: 'Google Drive',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg',
    connectedDate: 'Feb 1, 2024'
  }
])

const availableIntegrations = ref([
  {
    id: 1,
    name: 'Microsoft Teams',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg',
    description: 'Connect with your team and automate notifications'
  },
  {
    id: 2,
    name: 'Dropbox',
    icon: 'https://cdn.worldvectorlogo.com/logos/dropbox-1.svg',
    description: 'Sync and manage files automatically'
  },
  {
    id: 3,
    name: 'Jira',
    icon: 'https://cdn.worldvectorlogo.com/logos/jira-1.svg',
    description: 'Track issues and manage projects'
  },
  {
    id: 4,
    name: 'GitHub',
    icon: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    description: 'Automate your development workflow'
  }
])

const disconnectApp = (appId: number) => {
  if (confirm('Are you sure you want to disconnect this application?')) {
    connectedApps.value = connectedApps.value.filter(app => app.id !== appId)
  }
}

const connectIntegration = (integrationId: number) => {
  console.log('Connecting integration:', integrationId)
  // Implement OAuth flow or API key setup
}
</script>