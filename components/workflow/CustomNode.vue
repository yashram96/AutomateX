<template>
  <div 
    class="custom-node relative" 
    :class="{ 
      selected: selected,
      'custom-node-group': data.type === 'custom_group'
    }"
  >
    <div class="custom-node-header group" @dblclick="openEditModal">
      <component :is="getIcon(data.icon)" class="h-5 w-5 text-gray-400" />
      <span class="ml-2 text-sm font-medium">{{ data.label }}</span>
      <span v-if="data.type === 'custom_group'" class="ml-2 text-xs text-gray-500">
        ({{ data.children?.length || 0 }} nodes)
      </span>
      <span 
        v-if="data.config && Object.keys(data.config).length > 0" 
        class="ml-2 h-2 w-2 rounded-full bg-primary-500"
        title="Component configured"
      />
      <button 
        v-if="data.type === 'custom_group'"
        @click="toggleGroup"
        class="absolute right-8 top-2 p-1 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <component 
          :is="isExpanded ? MinusCircleIcon : PlusCircleIcon" 
          class="h-4 w-4"
        />
      </button>
      <button 
        @click="deleteNode"
        class="absolute right-2 top-2 p-1 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <TrashIcon class="h-4 w-4" />
      </button>
    </div>

    <!-- Group Content -->
    <div v-if="data.type === 'custom_group' && isExpanded" class="mt-4 p-4 border-t border-gray-200 dark:border-gray-700">
      <div v-if="data.children?.length" class="space-y-4">
        <div 
          v-for="child in data.children" 
          :key="child.id"
          class="relative pl-4 border-l-2 border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center">
            <component :is="getIcon(child.data.icon)" class="h-4 w-4 text-gray-400" />
            <span class="ml-2 text-sm">{{ child.data.label }}</span>
          </div>
        </div>
      </div>
      <div v-else class="text-sm text-gray-500 dark:text-gray-400">
        Drop nodes here to group them
      </div>
    </div>

    <!-- Configuration Modal -->
    <ComponentConfigModal
      :is-open="isEditModalOpen"
      :component="{ id, data }"
      @close="closeEditModal"
      @update="updateNode"
    />

    <!-- Handles -->
    <Handle
      id="top"
      type="source"
      position="top"
      class="!left-1/2 !-top-[4px] -translate-x-1/2"
    />
    <Handle
      id="right"
      type="source"
      position="right"
      class="!top-1/2 !right-[-4px] -translate-y-1/2"
    />
    <Handle
      id="bottom"
      type="target"
      position="bottom"
      class="!left-1/2 !-bottom-[4px] -translate-x-1/2"
    />
    <Handle
      id="left"
      type="source"
      position="left"
      class="!top-1/2 !-left-[4px] -translate-y-1/2"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Handle, useVueFlow } from '@vue-flow/core'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import {
  BoltIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ArrowPathRoundedSquareIcon,
  CloudIcon,
  TrashIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from '@heroicons/vue/24/outline'
import ComponentConfigModal from './ComponentConfigModal.vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:data', 'deleteNode'])

const isEditModalOpen = ref(false)
const editedLabel = ref('')
const isExpanded = ref(true)

const toggleGroup = () => {
  isExpanded.value = !isExpanded.value
}

const openEditModal = () => {
  editedLabel.value = props.data.label
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
}

const saveChanges = () => {
  emit('update:data', {
    ...props.data,
    label: editedLabel.value,
  })
  closeEditModal()
}

const { removeNodes } = useVueFlow()

const deleteNode = () => {
  removeNodes([props.id])
}

const icons = {
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  ArrowsPointingOutIcon,
  ArrowPathRoundedSquareIcon,
  ArrowsPointingInIcon,
  BoltIcon,
  CloudIcon,
}

const getIcon = (iconName: string) => icons[iconName] || BoltIcon

</script>

<style>
.custom-node {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4;
  min-width: 150px;
}

.custom-node.selected {
  @apply border-primary-500 shadow-md;
}

.custom-node-group {
  @apply min-w-[300px] min-h-[100px];
}

.custom-node-group.expanded {
  @apply min-h-[200px];
}

.custom-node-header {
  @apply flex items-center;
}

/* Handle Styles */
.vue-flow__handle {
  width: 8px;
  height: 8px;
  @apply bg-primary-500 border-2 border-white dark:border-gray-800;
  border-radius: 50%;
  z-index: 1;
}

.vue-flow__handle:hover {
  @apply bg-primary-600;
}

.vue-flow__handle-connecting {
  @apply bg-primary-400;
}

.vue-flow__handle-valid {
  @apply bg-green-500;
}

.vue-flow__handle-invalid {
  @apply bg-red-500;
}
</style>