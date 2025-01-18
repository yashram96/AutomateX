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
          <div v-if="component?.data?.config?.inputs" class="space-y-4">
            <div v-for="input in component.data.config.inputs" :key="input.name" class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ input.name }}
                <span v-if="input.required" class="text-red-500">*</span>
              </label>
              
              <!-- Text Input -->
              <input
                v-if="input.type === 'text'"
                type="text"
                v-model="config[input.name]"
                :placeholder="input.description"
                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                :required="input.required"
              />

              <!-- Number Input -->
              <input
                v-else-if="input.type === 'number'"
                type="number"
                v-model.number="config[input.name]"
                :placeholder="input.description"
                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                :required="input.required"
              />

              <!-- Dropdown Input -->
              <select
                v-else-if="input.type === 'dropdown' && input.options"
                v-model="config[input.name]"
                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                :required="input.required"
              >
                <option value="">Select {{ input.name }}</option>
                <option v-for="option in input.options" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>

              <!-- Boolean Input -->
              <div v-else-if="input.type === 'boolean'" class="flex items-center">
                <input
                  type="checkbox"
                  v-model="config[input.name]"
                  class="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                />
                <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">{{ input.description }}</span>
              </div>

              <!-- JSON Input -->
              <textarea
                v-else-if="input.type === 'json'"
                v-model="config[input.name]"
                rows="3"
                :placeholder="input.description"
                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                :required="input.required"
              ></textarea>

              <!-- Help Text -->
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {{ input.description }}
              </p>
            </div>
          </div>

          <!-- Authentication Configuration -->
          <div v-if="component?.data?.config?.auth_method" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Authentication Method
              </label>
              <select
                v-model="config.auth_method"
                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              >
                <option v-for="option in component.data.config.auth_method.options" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {{ component.data.config.auth_method.description }}
              </p>
            </div>
          </div>

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

const config = ref<any>({})

watch(() => props.component, () => {
  if (props.component?.data) {
    // Initialize config with existing values
    config.value = {
      label: props.component.data.label,
      ...props.component.data.config
    }

    // Initialize input fields from component configuration
    if (props.component.data.config?.inputs) {
      props.component.data.config.inputs.forEach((input: any) => {
        if (!(input.name in config.value)) {
          config.value[input.name] = ''
        }
      })
    }
  }
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
