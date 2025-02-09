<template>
  <ClientOnly>
    <div class="relative h-[500px] w-[800px] rounded-lg bg-gray-50 dark:bg-gray-800/50 overflow-hidden group" style="height: 500px; width: 800px;">
      <VueFlow
        v-model="nodes"
        :edges="edges"
        :default-viewport="{ x: 0, y: 0, zoom: 1 }"
        :min-zoom="0.5"
        :max-zoom="2"
        :node-dimensions-change="true"
        :nodes-draggable="true"
        :nodes-connectable="true"
        :elements-selectable="true"
        fit-view-on-init
        class="workflow-preview"
        @connect="onConnect"
        @dragOver="onDragOver"
        @drop="onDrop"
      >
        <Background 
          :pattern-color="isDark ? '#374151' : '#E5E7EB'" 
          :gap="20"
          :size="1"
        />
        <Controls />
        <MiniMap />
        <template #node-custom="nodeProps">
          <div 
            class="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-lg border border-gray-200 dark:border-gray-700 min-w-[180px] transition-all duration-200 hover:shadow-xl hover:border-primary-500 cursor-move"
          >
            <div class="flex items-center space-x-3">
              <component 
                :is="getIcon(nodeProps.data.icon)" 
                class="h-5 w-5 text-primary-600" 
              />
              <span class="text-sm font-medium text-gray-900 dark:text-white">
                {{ nodeProps.data.label }}
              </span>
            </div>
            <div class="mt-2 text-xs text-gray-500">
              {{ nodeProps.data.description }}
            </div>
          </div>
        </template>
        
        <!-- Draggable Components Panel -->
        <Panel position="top-right" class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Drag Components</h3>
          <div class="space-y-2">
            <div
              v-for="component in availableComponents"
              :key="component.id"
              class="p-2 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 cursor-move"
              draggable="true"
              @dragstart="onDragStart($event, component)"
            >
              <div class="flex items-center space-x-2">
                <component :is="getIcon(component.icon)" class="h-4 w-4 text-primary-600" />
                <span class="text-xs">{{ component.label }}</span>
              </div>
            </div>
          </div>
        </Panel>
      </VueFlow>
      
      <!-- Interactive Overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div class="text-white text-center p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p class="text-lg font-semibold mb-2">Try it yourself!</p>
          <p class="text-sm">Drag components, connect nodes, and see your workflow come to life</p>
        </div>
      </div>
    </div>
    <template #fallback>
      <div class="relative h-[500px] w-[800px] rounded-lg bg-gray-50 dark:bg-gray-800/50 overflow-hidden flex items-center justify-center" style="height: 500px; width: 800px;">
        <div class="text-gray-500 dark:text-gray-400">Loading workflow preview...</div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { VueFlow, Panel, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { BoltIcon, EnvelopeIcon, DocumentTextIcon } from '@heroicons/vue/24/outline'

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const { project } = useVueFlow({
  defaultViewport: { x: 0, y: 0, zoom: 1 },
  minZoom: 0.5,
  maxZoom: 2,
})

// Helper function to get icon component
const getIcon = (icon: string) => {
  const icons: Record<string, any> = {
    DocumentTextIcon,
    BoltIcon,
    EnvelopeIcon
  }
  return icons[icon] || BoltIcon
}

// Available components for dragging
const availableComponents = [
  {
    id: 'trigger',
    label: 'Trigger',
    icon: 'BoltIcon',
    description: 'Start your workflow'
  },
  {
    id: 'action',
    label: 'Action',
    icon: 'DocumentTextIcon',
    description: 'Perform an action'
  },
  {
    id: 'notification',
    label: 'Notification',
    icon: 'EnvelopeIcon',
    description: 'Send notifications'
  }
]

// Initial node positions
const initialNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 100, y: 100 },
    data: { 
      label: 'Document Upload', 
      icon: 'DocumentTextIcon',
      description: 'Upload and process documents'
    },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 400, y: 50 },
    data: { 
      label: 'Process Data', 
      icon: 'BoltIcon',
      description: 'Transform and analyze data'
    },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 400, y: 150 },
    data: { 
      label: 'Send Notification', 
      icon: 'EnvelopeIcon',
      description: 'Notify team members'
    },
  },
]

// Define nodes with initial positions
const nodes = ref(initialNodes)

// Define connections between nodes
const edges = ref([
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#6366f1', strokeWidth: 2 },
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    animated: true,
    style: { stroke: '#6366f1', strokeWidth: 2 },
  },
])

// Handle drag and drop
const onDragStart = (event: DragEvent, node: any) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', JSON.stringify(node))
    event.dataTransfer.effectAllowed = 'move'
  }
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const onDrop = (event: DragEvent) => {
  event.preventDefault()

  if (!event.dataTransfer) return

  const data = JSON.parse(event.dataTransfer.getData('application/vueflow'))
  
  // Get the position relative to the viewport
  const position = project({
    x: event.clientX,
    y: event.clientY
  })

  const newNode = {
    id: `${data.id}-${Date.now()}`,
    type: 'custom',
    position,
    data: {
      label: data.label,
      icon: data.icon,
      description: data.description
    }
  }

  nodes.value = [...nodes.value, newNode]
}

const onConnect = (params: any) => {
  const newEdge = {
    id: `e${params.source}-${params.target}`,
    source: params.source,
    target: params.target,
    animated: true,
    style: { stroke: '#6366f1', strokeWidth: 2 }
  }
  edges.value = [...edges.value, newEdge]
}

let animationInterval: NodeJS.Timeout | null = null

// Only run animations on client-side
onMounted(() => {
  if (process.client) {
    // Ensure nodes are properly initialized before starting animation
    nodes.value = [...initialNodes]
    
    animationInterval = setInterval(() => {
      nodes.value = nodes.value.map(node => ({
        ...node,
        position: {
          x: (node.position?.x || 0) + (Math.random() - 0.5) * 5,
          y: (node.position?.y || 0) + (Math.random() - 0.5) * 5,
        },
      }))
    }, 2000)
  }
})

onUnmounted(() => {
  if (animationInterval) {
    clearInterval(animationInterval)
  }
})
</script>

<style>
.workflow-preview {
  width: 800px !important;
  height: 500px !important;
}

.workflow-preview .vue-flow__edge path {
  stroke: #6366f1;
  stroke-width: 2;
}

.workflow-preview .vue-flow__edge.animated path {
  stroke-dasharray: 5;
  animation: dashdraw 1s linear infinite;
}

@keyframes dashdraw {
  from {
    stroke-dashoffset: 10;
  }
}
</style>