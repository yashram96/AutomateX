<template>
  <div class="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow">
    <div class="p-6">
      <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Popular Integrations</h3>
      <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="integration in integrations"
          :key="integration.name"
          class="relative flex items-center space-x-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:border-primary-500"
        >
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-lg" :src="integration.logo" :alt="integration.name" />
          </div>
          <div class="min-w-0 flex-1">
            <a href="#" class="focus:outline-none">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ integration.name }}</p>
              <p class="truncate text-sm text-gray-500 dark:text-gray-400">{{ integration.description }}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const integrations = [
  {
    name: 'Slack',
    description: 'Team communication',
    logo: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg',
  },
  {
    name: 'Google Sheets',
    description: 'Spreadsheet automation',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg',
  },
  {
    name: 'Salesforce',
    description: 'CRM integration',
    logo: 'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg',
  },
  {
    name: 'GitHub',
    description: 'Version control',
    logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
  },
]
</script>