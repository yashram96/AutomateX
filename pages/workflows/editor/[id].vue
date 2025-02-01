<template>
  <div class="flex h-screen flex-col">
    <!-- Editor Header -->
    <div class="sticky top-0 z-10 flex-none border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center space-x-4">
          <NuxtLink
            to="/dashboard"
            class="mr-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <ArrowLeftIcon class="h-6 w-6" />
          </NuxtLink>
          <h1 class="text-lg font-semibold text-gray-900 dark:text-white">{{ workflowName }}</h1>
          
          <!-- Undo/Redo Buttons -->
          <div class="flex items-center space-x-2 ml-4">
            <button
              type="button"
              :disabled="!canUndo"
              :class="[
                'inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm',
                canUndo
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              ]"
              @click="undo"
              title="Undo (Ctrl/Cmd + Z)"
            >
              <ArrowUturnLeftIcon class="h-4 w-4 mr-1" />
              Undo
            </button>
            <button
              type="button"
              :disabled="!canRedo"
              :class="[
                'inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm',
                canRedo
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              ]"
              @click="redo"
              title="Redo (Ctrl/Cmd + Shift + Z)"
            >
              <ArrowUturnRightIcon class="h-4 w-4 mr-1" />
              Redo
            </button>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button
            type="button"
            @click="showEnvVarsModal = true"
            class="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <CogIcon class="h-4 w-4 mr-2" />
            Environment Variables
          </button>
          <button
            type="button"
            class="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <ArrowPathIcon class="h-4 w-4 mr-2" />
            Run Test
          </button>
          <button
            type="button"
            class="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            @click="saveWorkflow"
          >
            <CheckIcon class="h-4 w-4 mr-2" />
            Save & Activate
          </button>
        </div>
      </div>
    </div>

    <!-- Editor Content -->
    <div class="flex-1 overflow-hidden relative">
      <div class="flex h-full">
        <!-- Canvas -->
        <div class="flex-1 bg-gray-50 dark:bg-gray-900 transition-colors duration-200 dark:text-white">
          <VueFlow
            v-model="nodes"
            :edges="edges"
            :nodesDraggable="true"
            :default-edge-options="defaultEdgeOptions"
            @nodesDragStop="updateWorkflowData"
            @nodesChange="onNodesChange"
            @edgesChange="onEdgesChange"
            @connect="onConnect"
            :default-viewport="{ zoom: 1 }"
            :min-zoom="0.2"
            :max-zoom="4"
            class="h-full"
            @drop="onDrop"
            @dragover="onDragOver"
            :fit-view-on-init="false"
            :snap-to-grid="true"
            :delete-key-code="'Delete'"
            :multi-selection-key-code="'Control'"
            :selection-key-code="'Shift'"
            :elevate-nodes-on-select="true"
            :auto-pan-on-node-drag="true"
          >
            <template #node-custom="nodeProps">
              <CustomNode v-bind="nodeProps" />
            </template>
            <Background 
              pattern="dots"
              :pattern-color="isDark ? '#374151' : '#E5E7EB'" 
              :gap="20" 
            />
            <Controls />
            <MiniMap />
            <Panel position="top-center" class="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg">
              {{ debugMessage }}
            </Panel>
          </VueFlow>
        </div>

        <!-- Components Panel -->
        <div class="w-80 flex-none overflow-y-auto border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 min-h-[calc(100vh-8rem)]">
          <div class="p-4">
            <div class="mb-4">
              <label for="search-components" class="sr-only">Search components</label>
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  v-model="searchQuery"
                  id="search-components"
                  class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 dark:text-white dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  placeholder="Search components"
                />
              </div>
            </div>

            <div v-if="isLoading" class="flex justify-center py-4">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>

            <div v-else-if="error" class="text-red-500 text-sm text-center py-4">
              {{ error }}
            </div>

            <div v-else class="space-y-4">
              <div v-for="(components, category) in groupedComponents" :key="category">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ category }}</h3>
                <div class="mt-2 grid grid-cols-2 gap-2">
                  <div
                    v-for="component in filterComponents(components)"
                    :key="component.id"
                    class="group relative flex items-center space-x-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 shadow-sm hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2"
                    draggable
                    @dragstart="onDragStart($event, component)"
                  >
                    <div class="flex-shrink-0">
                      <component :is="getIcon(component.icon)" class="h-5 w-5 text-gray-400 group-hover:text-primary-500" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <span class="absolute inset-0" aria-hidden="true" />
                      <p class="text-sm font-medium text-gray-900 dark:text-white">{{ component.name }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Execution Panel -->
    <ExecutionPanel v-model:isExpanded="isExecutionPanelExpanded" />

    <!-- Environment Variables Modal -->
    <EnvironmentVariablesModal
      :is-open="showEnvVarsModal"
      :initial-variables="workflowData.workflow.environment"
      @close="showEnvVarsModal = false"
      @update="updateEnvironmentVariables"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'authenticated',
  middleware: ['auth']
})

import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { VueFlow, useVueFlow, Panel, Position } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import CustomNode from '~/components/workflow/CustomNode.vue'
import ExecutionPanel from '~/components/workflow/ExecutionPanel.vue'
import EnvironmentVariablesModal from '~/components/workflow/EnvironmentVariablesModal.vue'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'
import '@vue-flow/minimap/dist/style.css'

import {
  ArrowLeftIcon,
  ArrowPathIcon,
  CheckIcon,
  MagnifyingGlassIcon,
  BoltIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ArrowPathRoundedSquareIcon,
  CloudIcon,
  CircleStackIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  FolderIcon,
  FunnelIcon as FilterIcon,
  EnvelopeIcon as MailIcon,
  ClockIcon as TimeIcon,
  CogIcon,
} from '@heroicons/vue/24/outline'

import { useComponents } from '~/composables/useComponents'

const route = useRoute()
const router = useRouter()
const colorMode = useColorMode()
const { viewport } = useVueFlow({
  defaultViewport: { x: 0, y: 0, zoom: 1 },
  minZoom: 0.2,
  maxZoom: 4,
})

// Use the components composable
const { components, groupedComponents, isLoading, error } = useComponents()

// Add search functionality
const searchQuery = ref('')

const filterComponents = (components: any[]) => {
  if (!searchQuery.value) return components
  
  const query = searchQuery.value.toLowerCase()
  return components.filter(component => 
    component.name.toLowerCase().includes(query) ||
    component.description.toLowerCase().includes(query) ||
    component.tags.some((tag: string) => tag.toLowerCase().includes(query))
  )
}

// Icon mapping helper
const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    'BoltIcon': BoltIcon,
    'ChatBubbleLeftRightIcon': ChatBubbleLeftRightIcon,
    'DocumentTextIcon': DocumentTextIcon,
    'ArrowsPointingInIcon': ArrowsPointingInIcon,
    'ArrowsPointingOutIcon': ArrowsPointingOutIcon,
    'CloudIcon': CloudIcon,
    'CircleStackIcon': CircleStackIcon,
    'FolderIcon': FolderIcon,
    'FilterIcon': FilterIcon,
    'MailIcon': MailIcon,
    'TimeIcon': TimeIcon,
  }
  return icons[iconName] || BoltIcon
}

const workflowName = computed(() => decodeURIComponent(route.params.id as string))
const debugMessage = ref('Ready to build workflow')
const isDark = computed(() => colorMode.value === 'dark')
const nodes = ref<any[]>([])
const edges = ref<any[]>([])
const showEnvVarsModal = ref(false)
const isExecutionPanelExpanded = ref(false)

// Initialize history with empty arrays
const history = ref({
  past: [] as any[],
  future: [] as any[],
  current: {
    nodes: [],
    edges: []
  }
})

// Add undo/redo state tracking
const canUndo = computed(() => history.value.past.length > 0)
const canRedo = computed(() => history.value.future.length > 0)

// Save current state to history before making changes
const saveToHistory = () => {
  const currentState = {
    nodes: JSON.parse(JSON.stringify(nodes.value)),
    edges: JSON.parse(JSON.stringify(edges.value))
  }
  
  history.value.past.push(history.value.current)
  history.value.current = currentState
  history.value.future = []
}

// Initialize history with current state
const initHistory = () => {
  history.value = {
    past: [],
    future: [],
    current: {
      nodes: JSON.parse(JSON.stringify(nodes.value)),
      edges: JSON.parse(JSON.stringify(edges.value))
    }
  }
}

// Apply a state to the editor
const applyState = (state: any) => {
  nodes.value = JSON.parse(JSON.stringify(state.nodes))
  edges.value = JSON.parse(JSON.stringify(state.edges))
}

const undo = () => {
  if (canUndo.value) {
    const previous = history.value.past.pop()
    history.value.future.push(history.value.current)
    history.value.current = previous
    applyState(previous)
    debugMessage.value = 'Undid last action'
  }
}

const redo = () => {
  if (canRedo.value) {
    const next = history.value.future.pop()
    history.value.past.push(history.value.current)
    history.value.current = next
    applyState(next)
    debugMessage.value = 'Redid last action'
  }
}

// Handle keyboard shortcuts
const handleKeyDown = (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'z') {
    if (event.shiftKey) {
      event.preventDefault()
      redo()
    } else {
      event.preventDefault()
      undo()
    }
  } else if ((event.metaKey || event.ctrlKey) && event.key === 'y') {
    event.preventDefault()
    redo()
  }
}

const workflowData = ref({
  workflow: {
    metadata: {
      id: route.params.id,
      name: workflowName.value,
      description: "Workflow created in editor",
      version: 1,
      status: "draft",
      created_by: "user-123",
      created_at: new Date().toISOString(),
      updated_by: "user-123",
      updated_at: new Date().toISOString(),
      tags: []
    },
    environment: {} as Record<string, string>,
    canvas: {
      viewport: {
        x: 0,
        y: 0,
        zoom: 1
      },
      dimensions: {
        width: 2000,
        height: 2000
      }
    },
    nodes: [],
    edges: [],
    execution: {
      timeout: 300,
      retry: {
        attempts: 3,
        backoff: "exponential"
      },
      error_handling: {
        on_failure: "notify_admin"
      }
    }
  }
})

const defaultEdgeOptions = {
  type: 'smoothstep',
  style: { stroke: '#0077ff', strokeWidth: 2 },
  animated: true,
  markerEnd: { type: 'arrow' },
}

const updateWorkflowData = () => {
  workflowData.value = {
    workflow: {
      ...workflowData.value.workflow,
      metadata: {
        ...workflowData.value.workflow.metadata,
        updated_at: new Date().toISOString()
      },
      nodes: nodes.value.map(node => ({
        ...node,
        data: {
          ...node.data,
          config: node.data.config || {}
        }
      })),
      edges: edges.value.map(edge => ({
        ...edge,
        data: {
          label: edge.label || '',
          condition: null
        }
      }))
    }
  }
}

const updateEnvironmentVariables = (variables: Record<string, string>) => {
  workflowData.value.workflow.environment = variables
  saveWorkflow()
}

const saveWorkflow = () => {
  updateWorkflowData()
  localStorage.setItem(
    `workflow-${workflowData.value.workflow.metadata.id}`, 
    JSON.stringify(workflowData.value, null, 2)
  )
  debugMessage.value = 'Workflow saved successfully'
}

const loadWorkflow = () => {
  const saved = localStorage.getItem(`workflow-${workflowData.value.workflow.metadata.id}`)
  if (saved) {
    const data = JSON.parse(saved)
    if (data.workflow) {
      workflowData.value = data
      nodes.value = data.workflow.nodes.map(node => ({
        ...node,
        type: 'custom',
        dragHandle: '.custom-node-header',
        connectable: true,
        selectable: true,
      }))
      edges.value = data.workflow.edges || []
    } else {
      workflowData.value = {
        workflow: {
          metadata: {
            id: data.workflow_name || route.params.id,
            name: data.workflow_name || workflowName.value,
            description: data.description || '',
            version: data.version || 1,
          },
          nodes: data.nodes || [],
          edges: data.edges || []
        }
      }
      nodes.value = data.nodes.map(node => ({
        ...node,
        type: 'custom',
        dragHandle: '.custom-node-header',
        connectable: true,
        selectable: true,
      }))
      edges.value = data.edges || []
    }
    debugMessage.value = 'Workflow loaded successfully'
  }
}

const onConnect = (params: any) => {
  saveToHistory()
  const edge = {
    id: `edge-${Date.now()}`,
    source: params.source,
    target: params.target,
    sourceHandle: params.sourceHandle,
    targetHandle: params.targetHandle,
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#0077ff', strokeWidth: 2 },
    markerEnd: { type: 'arrow' },
    data: {
      label: '',
      condition: null
    }
  }
  edges.value.push(edge)
  updateWorkflowData()
  debugMessage.value = 'Connected nodes'
}

const onNodesChange = (changes: any[]) => {
  changes.forEach(change => {
    if (change.type === 'position' && change.dragging) {
      const node = nodes.value.find(n => n.id === change.id)
      if (node && change.position) {
        node.position = {
          x: Number(change.position.x) || node.position.x || 0,
          y: Number(change.position.y) || node.position.y || 0
        }
      }
      return
    }
    
    saveToHistory()
    
    if (change.type === 'remove') {
      nodes.value = nodes.value.filter(node => node.id !== change.id)
    } else if (change.type === 'position' && !change.dragging) {
      const node = nodes.value.find(n => n.id === change.id)
      if (node && change.position) {
        node.position = {
          x: Number(change.position.x) || node.position.x || 0,
          y: Number(change.position.y) || node.position.y || 0
        }
      }
    }
  })
  
  updateWorkflowData()
}

const onEdgesChange = (changes: any[]) => {
  saveToHistory()
  changes.forEach(change => {
    if (change.type === 'remove') {
      edges.value = edges.value.filter(edge => edge.id !== change.id)
    }
  })
}

const onDragStart = (event: DragEvent, component: any) => {
  if (event.dataTransfer) {
    const componentData = {
      name: component.name,
      type: component.type,
      iconName: component.icon,
      config: {
        ...component.configurations,
        inputs: component.inputs,
        outputs: component.outputs
      }
    }
    event.dataTransfer.setData('application/vueflow', JSON.stringify(componentData))
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
  saveToHistory()
  try {
    const data = JSON.parse(event.dataTransfer?.getData('application/vueflow') || '{}')
    const wrapper = event.currentTarget as HTMLDivElement
    if (!wrapper) return
    
    const bounds = wrapper.getBoundingClientRect()
    const position = {
      x: (event.clientX - bounds.left - (viewport.value?.x || 0)) / (viewport.value?.zoom || 1),
      y: (event.clientY - bounds.top - (viewport.value?.y || 0)) / (viewport.value?.zoom || 1)
    }

    const newNode = {
      id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'custom',
      position,
      data: { 
        label: data.name,
        icon: data.iconName,
        config: data.config || {},
        type: data.type || 'default'
      },
      dragHandle: '.custom-node-header',
      connectable: true,
      selectable: true,
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    }

    nodes.value.push(newNode)
    debugMessage.value = `Added ${data.name} component`
    updateWorkflowData()
  } catch (error) {
    console.error('Error handling drop:', error)
    debugMessage.value = 'Error adding component'
  }
}

// Watch for changes and update workflow data
watch([nodes, edges], () => {
  updateWorkflowData()
}, { deep: true })

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  if (!route.params.id) {
    router.push('/')
    return
  }
  loadWorkflow()
  initHistory()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>