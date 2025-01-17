<template>
  <div class="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow">
    <div class="p-6">
      <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Quick Actions</h3>
      <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <button
          v-for="action in quickActions"
          :key="action.name"
          class="relative flex items-center space-x-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-5 shadow-sm hover:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          @click="handleActionClick(action)"
        >
          <div class="flex-shrink-0">
            <component :is="action.icon" class="h-6 w-6 text-primary-600" aria-hidden="true" />
          </div>
          <div class="min-w-0 flex-1">
            <span class="absolute inset-0" aria-hidden="true" />
            <p class="text-sm font-medium text-gray-900 dark:text-white">{{ action.name }}</p>
          </div>
        </button>
      </div>
      
      <CreateWorkflowModal
        :isOpen="showCreateModal"
        @close="showCreateModal = false" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, RocketLaunchIcon, DocumentDuplicateIcon, AcademicCapIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import CreateWorkflowModal from '~/components/workflow/CreateWorkflowModal.vue'

const showCreateModal = ref(false)

const quickActions = [
  { name: 'Create Workflow', icon: PlusIcon },
  { name: 'Launch Template', icon: RocketLaunchIcon },
  { name: 'Duplicate Existing', icon: DocumentDuplicateIcon },
  { name: 'View Tutorial', icon: AcademicCapIcon },
]

const handleActionClick = (action: { name: string }) => {
  if (action.name === 'Create Workflow') {
    showCreateModal.value = true
  }
}
</script>