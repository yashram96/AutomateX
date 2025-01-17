<template>
  <div class="md:flex md:items-center md:justify-between">
    <div class="min-w-0 flex-1">
      <h2 class="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:tracking-tight">
        {{ welcomeMessage }}
      </h2>
    </div>
    <div class="mt-4 flex md:ml-4 md:mt-0">
      <button
        type="button"
        @click="navigateTo('/templates')"
        class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Explore Templates
      </button>
      <button
        type="button"
        @click="showCreateModal = true"
        class="ml-3 inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
      >
        <PlusIcon class="h-4 w-4 mr-2" />
        Create Workflow
      </button>
    </div>
    
    <CreateWorkflowModal
      :isOpen="showCreateModal"
      @close="showCreateModal = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import CreateWorkflowModal from '~/components/workflow/CreateWorkflowModal.vue'

const showCreateModal = ref(false)

const hour = new Date().getHours()
const welcomeMessage = computed(() => {
  if (hour < 12) return 'Good morning! Ready to automate?'
  if (hour < 18) return 'Good afternoon! Let\'s build something great!'
  return 'Good evening! Time for automation!'
})
</script>