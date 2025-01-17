<template>
  <div>
    <!-- Mobile backdrop -->
    <TransitionRoot as="template" :show="isSidebarOpen">
      <Dialog as="div" class="relative z-50 lg:hidden" @close="closeSidebar">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <div class="flex grow flex-col bg-white dark:bg-gray-800">
                <div class="flex h-16 shrink-0 items-center px-6">
                  <BoltIcon class="h-8 w-8 text-primary-600" />
                  <span class="ml-2 text-xl font-bold text-gray-900 dark:text-white">AutomateX</span>
                </div>
                <SidebarContent />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div :class="[
      'hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:flex-col transition-all duration-300',
      isCollapsed ? 'lg:w-16' : 'lg:w-72'
    ]">
      <div class="flex h-full flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div class="flex h-16 shrink-0 items-center justify-between px-4">
          <div class="flex items-center">
            <BoltIcon class="h-8 w-8 text-primary-600 flex-shrink-0" />
            <span
              :class="[
                'ml-2 text-xl font-bold text-gray-900 dark:text-white transition-all duration-300',
                isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
              ]"
            >
              AutomateX
            </span>
          </div>
        </div>
        <SidebarContent :isCollapsed="isCollapsed" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { BoltIcon, ArrowsRightLeftIcon } from '@heroicons/vue/24/outline'
import SidebarContent from './SidebarContent.vue'

const props = defineProps<{
  isSidebarOpen: boolean
  isCollapsed: boolean
}>()

const emit = defineEmits(['update:isSidebarOpen', 'update:isCollapsed'])
const closeSidebar = () => emit('update:isSidebarOpen', false)
const toggleCollapse = () => {
  emit('update:isCollapsed', !props.isCollapsed)
}
</script>

<style>
.custom-scrollbar {
  scrollbar-width: 6px;
  scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
  border: 2px solid transparent;
  background-clip: padding-box;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.7);
}

.dark .custom-scrollbar {
  scrollbar-color: rgba(75, 85, 99, 0.5) transparent;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.5);
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(75, 85, 99, 0.7);
}
</style>