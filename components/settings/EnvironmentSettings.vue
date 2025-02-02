<template>
  <div class="space-y-6">
    <!-- Environment Variables -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Environment Variables</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage global environment variables for your workflows
          </p>
        </div>
        <div class="flex space-x-2">
          <button
            @click="showBulkModal = true"
            class="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <DocumentDuplicateIcon class="h-4 w-4 mr-2" />
            Bulk Import
          </button>
          <button
            @click="showAddVariable = true"
            class="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
          >
            <PlusIcon class="h-4 w-4 mr-2" />
            Add Variable
          </button>
        </div>
      </div>

      <!-- Variables List -->
      <div class="mt-6">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Value</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="variable in variables" :key="variable.name">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {{ variable.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                <div class="flex items-center space-x-2">
                  <span>{{ variable.revealed ? variable.value : '••••••••' }}</span>
                  <button
                    @click="revealValue(variable)"
                    class="text-gray-400 hover:text-gray-500"
                  >
                    <EyeIcon v-if="!variable.revealed" class="h-4 w-4" />
                    <EyeSlashIcon v-else class="h-4 w-4" />
                  </button>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                <button
                  @click="editVariable(variable)"
                  class="text-primary-600 hover:text-primary-500 mr-4"
                >
                  Edit
                </button>
                <button
                  @click="deleteVariable(variable)"
                  class="text-red-600 hover:text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Variable Modal -->
    <TransitionRoot as="template" :show="showAddVariable">
      <Dialog as="div" class="relative z-10" @close="showAddVariable = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                      Add New Variable
                    </DialogTitle>
                    <div class="mt-4">
                      <form @submit.prevent="saveNewVariable" class="space-y-4">
                        <div>
                          <label for="variable-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                          </label>
                          <input
                            type="text"
                            id="variable-name"
                            v-model="addVariable.name"
                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            required
                          />
                        </div>
                        <div>
                          <label for="variable-value" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Value
                          </label>
                          <input
                            type="text"
                            id="variable-value"
                            v-model="addVariable.value"
                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            required
                          />
                        </div>
                        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                          <button
                            type="submit"
                            class="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:col-start-2"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            class="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 sm:col-start-1 sm:mt-0"
                            @click="showAddVariable = false"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Edit Variable Modal -->
    <TransitionRoot as="template" :show="showEditVariable">
      <Dialog as="div" class="relative z-10" @close="showEditVariable = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                      Edit Variable
                    </DialogTitle>
                    <div class="mt-4">
                      <form @submit.prevent="saveEditedVariable" class="space-y-4">
                        <div>
                          <label for="edit-variable-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                          </label>
                          <input
                            type="text"
                            id="edit-variable-name"
                            v-model="editingVariable.name"
                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            required
                          />
                        </div>
                        <div>
                          <label for="edit-variable-value" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Value
                          </label>
                          <input
                            type="text"
                            id="edit-variable-value"
                            v-model="editingVariable.value"
                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            required
                          />
                        </div>
                        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                          <button
                            type="submit"
                            class="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:col-start-2"
                          >
                            Save Changes
                          </button>
                          <button
                            type="button"
                            class="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 sm:col-start-1 sm:mt-0"
                            @click="showEditVariable = false"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Bulk Import Modal -->
    <TransitionRoot as="template" :show="showBulkModal">
      <Dialog as="div" class="relative z-10" @close="showBulkModal = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                      Bulk Import Variables
                    </DialogTitle>
                    <div class="mt-4">
                      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Enter variables in KEY=value format, one per line
                      </p>
                      <textarea
                        v-model="bulkVariables"
                        rows="8"
                        class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        placeholder="DATABASE_URL=postgres://user:pass@localhost:5432/db&#10;API_KEY=your-api-key&#10;DEBUG=false"
                      ></textarea>
                      <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="button"
                          @click="importVariables"
                          class="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:col-start-2"
                        >
                          Import
                        </button>
                        <button
                          type="button"
                          class="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 sm:col-start-1 sm:mt-0"
                          @click="showBulkModal = false"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Password Verification Modal -->
    <TransitionRoot as="template" :show="showPasswordModal">
      <Dialog as="div" class="relative z-20" @close="cancelPasswordVerification">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                      Verify Password
                    </DialogTitle>
                    <div class="mt-4">
                      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Please enter your password to reveal the variable value
                      </p>
                      <input
                        type="password"
                        v-model="verificationPassword"
                        class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Enter your password"
                      />
                      <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="button"
                          @click="verifyPassword"
                          class="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:col-start-2"
                        >
                          Verify
                        </button>
                        <button
                          type="button"
                          class="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 sm:col-start-1 sm:mt-0"
                          @click="cancelPasswordVerification"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Delete Confirmation Modal -->
    <TransitionRoot as="template" :show="showDeleteModal">
      <Dialog as="div" class="relative z-10" @close="cancelDelete">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon class="h-6 w-6 text-red-600 dark:text-red-400" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                      Delete Variable
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this variable? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    @click="confirmDelete"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 sm:mt-0 sm:w-auto"
                    @click="cancelDelete"
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog as HeadlessDialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { PlusIcon, EyeIcon, DocumentDuplicateIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { useAuth } from '~/composables/useAuth'

// Rename Dialog to avoid recursion issues
const Dialog = HeadlessDialog

interface Variable {
  name: string
  value: string
  revealed?: boolean
}

const variables = ref<Variable[]>([
  { name: 'API_KEY', value: 'sk_test_123' },
  { name: 'API_URL', value: 'https://api.example.com' },
  { name: 'WEBHOOK_SECRET', value: 'whsec_456' }
])

const showAddVariable = ref(false)
const showEditVariable = ref(false)
const showBulkModal = ref(false)
const showPasswordModal = ref(false)
const showDeleteModal = ref(false)
const editingVariable = ref<Variable | null>(null)
const variableToDelete = ref<Variable | null>(null)
const verificationPassword = ref('')
const bulkVariables = ref('')
const isPasswordVerified = ref(false)

const addVariable = ref<Variable>({
  name: '',
  value: ''
})


const editVariable = (variable: Variable) => {
  editingVariable.value = {
    name: variable.name,
    value: variable.value
  }
  showEditVariable.value = true
}

const deleteVariable = (variable: Variable) => {
  variableToDelete.value = variable
  showDeleteModal.value = true
}

const confirmDelete = () => {
  if (variableToDelete.value) {
    variables.value = variables.value.filter(v => v.name !== variableToDelete.value?.name)
    showDeleteModal.value = false
    variableToDelete.value = null
  }
}

const cancelDelete = () => {
  showDeleteModal.value = false
  variableToDelete.value = null
}

const saveNewVariable = () => {
  variables.value.push({ ...addVariable.value })
  showAddVariable.value = false
  addVariable.value = {
    name: '',
    value: ''
  }
}

const saveEditedVariable = () => {
  const index = variables.value.findIndex(v => v.name === editingVariable.value.name)
  if (index !== -1) {
    variables.value[index] = { ...editingVariable.value }
  }
  showEditVariable.value = false
  editingVariable.value = {
    name: '',
    value: ''
  }
}

const revealValue = async (variable: Variable) => {
  if (!isPasswordVerified.value) {
    showPasswordModal.value = true
    return
  }
  variable.revealed = !variable.revealed
}

const verifyPassword = () => {
  // In a real app, verify against actual user password
  const success = verificationPassword.value === 'password'
  if (success) {
    isPasswordVerified.value = true
    // Reveal all variables after password verification
    variables.value.forEach(v => v.revealed = true)
    showPasswordModal.value = false
    verificationPassword.value = ''
  } else {
    alert('Incorrect password')
  }
}

const cancelPasswordVerification = () => {
  showPasswordModal.value = false
  verificationPassword.value = ''
}

const importVariables = () => {
  const lines = bulkVariables.value.split('\n')
  const newVars: Variable[] = []
  
  for (const line of lines) {
    const [key, ...valueParts] = line.split('=')
    const value = valueParts.join('=') // Handle values that contain =
    
    if (key && value) {
      newVars.push({
        name: key.trim(),
        value: value.trim()
      })
    }
  }
  
  if (newVars.length > 0) {
    variables.value = [...variables.value, ...newVars]
    showBulkModal.value = false
    bulkVariables.value = ''
  }
}
</script>