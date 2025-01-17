<template>
  <div class="custom-node" :class="{ selected: selected }">
    <div class="custom-node-header">
      <component :is="getIcon(data.icon)" class="h-5 w-5 text-gray-400" />
      <span class="ml-2 text-sm font-medium">{{ data.label }}</span>
    </div>
    <Handle
      v-for="handle in handles"
      :key="handle.id"
      :id="handle.id"
      :type="handle.type"
      :position="handle.position"
    />
  </div>
</template>

<script setup lang="ts">
import { Handle } from '@vue-flow/core'
import {
  BoltIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ArrowPathRoundedSquareIcon,
  CloudIcon,
} from '@heroicons/vue/24/outline'

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

const handles = [
  { id: 'top', type: 'target', position: 'top' },
  { id: 'right', type: 'source', position: 'right' },
  { id: 'bottom', type: 'source', position: 'bottom' },
  { id: 'left', type: 'target', position: 'left' },
]
</script>

<style>
.custom-node {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4;
  min-width: 150px;
}

.custom-node.selected {
  @apply border-primary-500 shadow-md;
}

.custom-node-header {
  @apply flex items-center;
}
</style>