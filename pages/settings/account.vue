<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div class="space-y-6">
        <!-- Page Header -->
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        <!-- Settings Navigation -->
        <div class="flex">
          <!-- Sidebar Navigation -->
          <nav class="w-64 flex-shrink-0">
            <AccountSettingsSidebar :activeSection="activeSection" @update:section="activeSection = $event" />
          </nav>

          <!-- Main Content Area -->
          <div class="flex-1 ml-8">
            <component 
              :is="currentComponent" 
              v-if="currentComponent"
              @update="handleSettingsUpdate"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AccountSettingsSidebar from '~/components/settings/AccountSettingsSidebar.vue'
import ProfileSettings from '~/components/settings/ProfileSettings.vue'
import SecuritySettings from '~/components/settings/SecuritySettings.vue'
import BillingSettings from '~/components/settings/BillingSettings.vue'
import IntegrationsSettings from '~/components/settings/IntegrationsSettings.vue'
import EnvironmentSettings from '~/components/settings/EnvironmentSettings.vue'
import TeamSettings from '~/components/settings/TeamSettings.vue'
import NotificationSettings from '~/components/settings/NotificationSettings.vue'

defineEmits(['update'])
const route = useRoute()

definePageMeta({
  layout: 'authenticated',
  middleware: ['auth']
})

// Set initial active section from route query or default to 'profile'
const activeSection = ref(route.query.section?.toString() || 'profile')

// Watch for route query changes
watch(() => route.query.section, (newSection) => {
  if (newSection) {
    activeSection.value = newSection.toString()
  }
})

const currentComponent = computed(() => {
  const components = {
    'profile': ProfileSettings,
    'security': SecuritySettings,
    'billing': BillingSettings,
    'integrations': IntegrationsSettings,
    'environment': EnvironmentSettings,
    'team': TeamSettings,
    'notifications': NotificationSettings
  }
  return components[activeSection.value as keyof typeof components]
})

const handleSettingsUpdate = (data: any) => {
  // Handle settings updates here
  console.log('Settings updated:', data)
}
</script>