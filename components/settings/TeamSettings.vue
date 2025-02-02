<template>
  <div class="space-y-6">
    <!-- Team Members -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Team Members</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your team members and their roles
          </p>
        </div>
        <button
          @click="showInviteModal = true"
          class="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
        >
          <UserPlusIcon class="h-4 w-4 mr-2" />
          Invite Member
        </button>
      </div>

      <!-- Team Members List -->
      <div class="mt-6 space-y-4">
        <div v-for="member in teamMembers" :key="member.email" class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <img :src="member.avatar" :alt="member.name" class="h-10 w-10 rounded-full" />
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ member.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ member.email }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <select
              v-if="!member.owner"
              v-model="member.role"
              class="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="admin">Admin</option>
              <option value="member">Member</option>
              <option value="viewer">Viewer</option>
            </select>
            <span v-else class="text-sm text-gray-500 dark:text-gray-400">Owner</span>
            <button
              v-if="!member.owner"
              @click="removeMember(member)"
              class="text-red-600 hover:text-red-500"
            >
              <TrashIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pending Invites -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Pending Invites</h3>
      <div class="mt-6 space-y-4">
        <div v-for="invite in pendingInvites" :key="invite.email" class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-900 dark:text-white">{{ invite.email }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Invited {{ invite.date }}</p>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ invite.role }}</span>
            <button
              @click="cancelInvite(invite)"
              class="text-red-600 hover:text-red-500"
            >
              <TrashIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Invite Modal -->
    <TransitionRoot as="template" :show="showInviteModal">
      <Dialog as="div" class="relative z-10" @close="showInviteModal = false">
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
                      Invite Team Member
                    </DialogTitle>
                    <div class="mt-4">
                      <form @submit.prevent="sendInvite" class="space-y-4">
                        <div>
                          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            v-model="newInvite.email"
                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            required
                          />
                        </div>
                        <div>
                          <label for="role" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Role
                          </label>
                          <select
                            id="role"
                            v-model="newInvite.role"
                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                          >
                            <option value="admin">Admin</option>
                            <option value="member">Member</option>
                            <option value="viewer">Viewer</option>
                          </select>
                        </div>
                        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                          <button
                            type="submit"
                            class="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:col-start-2"
                          >
                            Send Invite
                          </button>
                          <button
                            type="button"
                            class="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 sm:col-start-1 sm:mt-0"
                            @click="showInviteModal = false"
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog as HeadlessDialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { UserPlusIcon, TrashIcon } from '@heroicons/vue/24/outline'

// Rename Dialog to avoid recursion issues
const Dialog = HeadlessDialog

interface TeamMember {
  name: string
  email: string
  role: string
  avatar: string
  owner?: boolean
}

interface PendingInvite {
  email: string
  role: string
  date: string
}

const showInviteModal = ref(false)
const teamMembers = ref<TeamMember[]>([
  {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'owner',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    owner: true
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
])

const pendingInvites = ref<PendingInvite[]>([
  {
    email: 'pending@example.com',
    role: 'member',
    date: '2 days ago'
  }
])

const newInvite = ref({
  email: '',
  role: 'member'
})

const removeMember = (member: TeamMember) => {
  if (confirm(`Are you sure you want to remove ${member.name} from the team?`)) {
    teamMembers.value = teamMembers.value.filter(m => m.email !== member.email)
  }
}

const cancelInvite = (invite: PendingInvite) => {
  pendingInvites.value = pendingInvites.value.filter(i => i.email !== invite.email)
}

const sendInvite = () => {
  pendingInvites.value.push({
    email: newInvite.value.email,
    role: newInvite.value.role,
    date: 'Just now'
  })
  showInviteModal.value = false
  newInvite.value = {
    email: '',
    role: 'member'
  }
}
</script>