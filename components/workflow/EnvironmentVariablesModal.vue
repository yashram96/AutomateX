<template>
  <Dialog :open="isOpen" @close="closeModal" class="relative z-50">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="w-full max-w-2xl rounded-lg bg-white dark:bg-gray-800 p-6">
        <DialogTitle class="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center justify-between">
          <span>Environment Variables</span>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </DialogTitle>

        <!-- Tabs -->
        <div class="border-b border-gray-200 dark:border-gray-700 mb-4">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              v-for="tab in tabs"
              :key="tab.name"
              @click="currentTab = tab.id"
              :class="[
                currentTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300',
                'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <!-- Manual Input Tab -->
        <div v-if="currentTab === 'manual'" class="space-y-4">
          <div class="flex gap-4">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Key</label>
              <input
                v-model="newKey"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Enter key"
              />
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Value</label>
              <input
                v-model="newValue"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Enter value"
              />
            </div>
            <div class="flex items-end">
              <button
                @click="addVariable"
                :disabled="!newKey || !newValue"
                class="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 disabled:bg-gray-400"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <!-- Bulk Input Tab -->
        <div v-else-if="currentTab === 'bulk'" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Bulk Input (KEY=value format, one per line)
            </label>
            <textarea
              v-model="bulkInput"
              rows="4"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="KEY1=value1&#10;KEY2=value2"
            ></textarea>
          </div>
          <button
            @click="processBulkInput"
            :disabled="!bulkInput"
            class="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 disabled:bg-gray-400"
          >
            Process
          </button>
        </div>

        <!-- Variables Table -->
        <div class="mt-6">
          <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead>
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Key</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Value</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="(variable, key) in variables" :key="key">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white">
                  {{ key }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                  <div class="flex items-center space-x-2">
                    <span>{{ variable.hidden ? '••••••••' : variable.value }}</span>
                    <button @click="toggleVisibility(key)" class="text-gray-400 hover:text-gray-500">
                      <EyeIcon v-if="variable.hidden" class="h-4 w-4" />
                      <EyeSlashIcon v-else class="h-4 w-4" />
                    </button>
                  </div>
                </td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button @click="editVariable(key)" class="text-primary-600 hover:text-primary-900">
                      <PencilIcon class="h-4 w-4" />
                    </button>
                    <button @click="deleteVariable(key)" class="text-red-600 hover:text-red-900">
                      <TrashIcon class="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Save Button -->
        <div class="mt-6 flex justify-end">
          <button
            @click="saveVariables"
            class="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
          >
            Save Changes
          </button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { XMarkIcon, EyeIcon, EyeSlashIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  isOpen: boolean
  initialVariables?: Record<string, string>
}>()

const emit = defineEmits(['close', 'update'])

const tabs = [
  { id: 'manual', name: 'Manual Input' },
  { id: 'bulk', name: 'Bulk Input' },
]

const currentTab = ref('manual')
const newKey = ref('')
const newValue = ref('')
const bulkInput = ref('')
const variables = ref<Record<string, { value: string, hidden: boolean }>>({})

// Initialize variables from props
watch(() => props.initialVariables, (newVars) => {
  if (newVars) {
    variables.value = Object.entries(newVars).reduce((acc, [key, value]) => {
      acc[key] = { value, hidden: true }
      return acc
    }, {} as Record<string, { value: string, hidden: boolean }>)
  }
}, { immediate: true })

const addVariable = () => {
  if (newKey.value && newValue.value) {
    variables.value[newKey.value] = { value: newValue.value, hidden: true }
    newKey.value = ''
    newValue.value = ''
  }
}

const processBulkInput = () => {
  const lines = bulkInput.value.split('\n')
  lines.forEach(line => {
    const [key, value] = line.split('=')
    if (key && value) {
      variables.value[key.trim()] = { value: value.trim(), hidden: true }
    }
  })
  bulkInput.value = ''
  currentTab.value = 'manual'
}

const toggleVisibility = (key: string) => {
  if (variables.value[key]) {
    variables.value[key].hidden = !variables.value[key].hidden
  }
}

const editVariable = (key: string) => {
  newKey.value = key
  newValue.value = variables.value[key].value
  delete variables.value[key]
  currentTab.value = 'manual'
}

const deleteVariable = (key: string) => {
  delete variables.value[key]
}

const saveVariables = () => {
  const plainVariables = Object.entries(variables.value).reduce((acc, [key, { value }]) => {
    acc[key] = value
    return acc
  }, {} as Record<string, string>)
  emit('update', plainVariables)
  closeModal()
}

const closeModal = () => {
  emit('close')
  newKey.value = ''
  newValue.value = ''
  bulkInput.value = ''
  currentTab.value = 'manual'
}
</script>
