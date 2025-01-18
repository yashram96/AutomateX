<template>
  <Dialog :open="isOpen" @close="closeModal" class="relative z-50">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="w-full max-w-2xl rounded-lg bg-white dark:bg-gray-800 p-6">
        <DialogTitle class="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center justify-between">
          <span>Configure {{ component?.data?.label }}</span>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </DialogTitle>

        <!-- Component Type Badge -->
        <div class="mb-6">
          <span class="inline-flex items-center rounded-md bg-primary-50 dark:bg-primary-900 px-2 py-1 text-xs font-medium text-primary-700 dark:text-primary-300">
            {{ component?.data?.type }}
          </span>
        </div>

        <!-- Configuration Form -->
        <form @submit.prevent="saveConfig" class="space-y-6">
          <!-- Basic Settings -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Label
            </label>
            <input
              type="text"
              v-model="config.label"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <!-- Dynamic Configuration Fields -->
          <template v-if="component?.data?.type === 'source'">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Source Type
                </label>
                <select
                  v-model="config.source_type"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                >
                  <option value="postgresql">PostgreSQL</option>
                  <option value="mysql">MySQL</option>
                  <option value="api">REST API</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Query/Endpoint
                </label>
                <textarea
                  v-model="config.query"
                  rows="3"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                ></textarea>
              </div>
            </div>
          </template>

          <template v-if="component?.data?.type === 'processor'">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Operations
                </label>
                <div class="mt-2 space-y-2">
                  <label class="inline-flex items-center">
                    <input type="checkbox" v-model="config.operations" value="remove_nulls" class="rounded">
                    <span class="ml-2">Remove Nulls</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input type="checkbox" v-model="config.operations" value="standardize_dates" class="rounded">
                    <span class="ml-2">Standardize Dates</span>
                  </label>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Output Format
                </label>
                <select
                  v-model="config.output_format"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                >
                  <option value="json">JSON</option>
                  <option value="csv">CSV</option>
                  <option value="xml">XML</option>
                </select>
              </div>
            </div>
          </template>

          <template v-if="component?.data?.type === 'action'">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Action Type
                </label>
                <select
                  v-model="config.action_type"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                >
                  <option value="send_email">Send Email</option>
                  <option value="send_slack">Send Slack Message</option>
                  <option value="http_request">HTTP Request</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Recipients
                </label>
                <input
                  type="text"
                  v-model="config.recipients"
                  placeholder="Comma-separated emails or channels"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Template ID
                </label>
                <input
                  type="text"
                  v-model="config.template"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
            </div>
          </template>

          <template v-if="component?.data?.type === 'trigger'">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Event Source
                </label>
                <select
                  v-model="config.source"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                >
                  <option value="google_drive">Google Drive</option>
                  <option value="dropbox">Dropbox</option>
                  <option value="webhook">Webhook</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Watch Folder
                </label>
                <input
                  type="text"
                  v-model="config.watch_folder"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  File Types
                </label>
                <input
                  type="text"
                  v-model="config.file_types"
                  placeholder="*.csv, *.xlsx"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
            </div>
          </template>

          <template v-if="component?.data?.type === 'ai'">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  AI Model
                </label>
                <select
                  v-model="config.model"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                >
                  <option value="gpt-4">GPT-4</option>
                  <option value="bert">BERT</option>
                  <option value="custom">Custom Model</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Task Type
                </label>
                <select
                  v-model="config.task"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                >
                  <option value="analyze_sentiment">Sentiment Analysis</option>
                  <option value="classify_text">Text Classification</option>
                  <option value="extract_entities">Entity Extraction</option>
                </select>
              </div>
            </div>
          </template>

          <!-- Save/Cancel Buttons -->
          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              @click="closeModal"
              class="rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  isOpen: boolean
  component: any
}>()

const emit = defineEmits(['close', 'update'])

const config = ref({
  label: '',
  // Source Node
  source_type: 'postgresql',
  query: '',
  connection_string: '',
  // Processor Node
  operations: [],
  output_format: 'json',
  // Action Node
  action_type: 'send_email',
  channel: 'email',
  recipients: '',
  template: '',
  // Trigger Node
  source: 'google_drive',
  watch_folder: '',
  file_types: '',
  // AI Node
  model: 'gpt-4',
  task: 'analyze_sentiment',
  parameters: {},
})

watch(() => props.component, () => {
  if (props.component?.data?.config) {
    config.value = { ...config.value, ...props.component.data.config }
  }
  config.value.label = props.component?.data?.label || ''
}, { immediate: true })

const closeModal = () => {
  emit('close')
}

const saveConfig = () => {
  emit('update', {
    ...props.component,
    data: {
      ...props.component.data,
      label: config.value.label,
      config: { ...config.value }
    }
  })
  closeModal()
}
</script>