<template>
  <div
    class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 z-50 select-none"
    :style="{ 
      height: isExpanded ? panelHeight + 'px' : '40px',
      transition: isResizing ? 'none' : 'height 0.3s ease-out'
    }"
  >
    <!-- Resize Handle with improved hit area -->
    <div
      v-if="isExpanded"
      class="absolute left-0 right-0 top-0 h-4 cursor-ns-resize"
      :class="{ 'bg-primary-500/10': isResizing }"
      @mousedown="startResizing"
    ></div>

    <!-- Header Bar -->
    <div 
      class="flex items-center justify-between px-4 h-10 border-b border-gray-200 dark:border-gray-700 cursor-pointer"
      @click="togglePanel"
    >
      <div class="flex items-center space-x-2">
        <ChevronUpIcon v-if="isExpanded" class="h-5 w-5 text-gray-500 dark:text-gray-400" />
        <ChevronDownIcon v-else class="h-5 w-5 text-gray-500 dark:text-gray-400" />
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Execution Logs</h3>
        <div class="flex items-center space-x-1">
          <div
            v-if="hasErrors"
            class="flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          >
            {{ errorCount }} Errors
          </div>
          <div
            v-if="hasWarnings"
            class="flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          >
            {{ warningCount }} Warnings
          </div>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <div class="flex items-center space-x-2" v-if="isExpanded">
          <!-- Search Input -->
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search logs..."
              class="w-48 px-3 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
            />
            <MagnifyingGlassIcon class="absolute right-2 top-1.5 h-4 w-4 text-gray-400" />
          </div>
          
          <!-- Severity Filter -->
          <select
            v-model="severityFilter"
            class="text-sm rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="all">All Severities</option>
            <option value="error">Errors Only</option>
            <option value="warning">Warnings Only</option>
            <option value="info">Info Only</option>
          </select>

          <!-- Auto-scroll Toggle -->
          <button
            @click="autoScroll = !autoScroll"
            :class="[
              'px-2 py-1 text-xs rounded-md',
              autoScroll
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            ]"
          >
            <ArrowDownCircleIcon class="h-4 w-4" />
          </button>

          <!-- Clear Logs -->
          <button
            @click="clearLogs"
            class="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <TrashIcon class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Panel Content -->
    <div v-if="isExpanded" class="h-[calc(100%-2.5rem)] flex flex-col">
      <!-- Tabs -->
      <div class="px-4 border-b border-gray-200 dark:border-gray-700">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="currentTab = tab.id"
            :class="[
              'py-2 text-sm font-medium border-b-2 whitespace-nowrap',
              currentTab === tab.id
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Log Content -->
      <div class="flex-1 overflow-y-auto custom-scrollbar p-4 font-mono text-sm" ref="logContainer">
        <template v-if="filteredLogs.length">
          <div
            v-for="(log, index) in filteredLogs"
            :key="index"
            :class="[
              'py-1',
              log.severity === 'error' ? 'text-red-600 dark:text-red-400' :
              log.severity === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
              'text-gray-600 dark:text-gray-400'
            ]"
          >
            <span class="text-gray-400 dark:text-gray-500">{{ log.timestamp }}</span>
            <span class="mx-2">|</span>
            <span
              :class="[
                'px-1.5 py-0.5 rounded-full text-xs font-medium mr-2',
                log.severity === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                log.severity === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              ]"
            >
              {{ log.severity.toUpperCase() }}
            </span>
            <span>{{ log.message }}</span>
          </div>
        </template>
        <div v-else class="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
          No logs to display
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import {
  ChevronUpIcon,
  ChevronDownIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ArrowDownCircleIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline'

interface Log {
  timestamp: string
  severity: 'info' | 'warning' | 'error'
  message: string
  nodeId?: string
}

const props = defineProps<{
  isExpanded?: boolean
}>();
const emit = defineEmits(['update:isExpanded']);

// State
const currentTab = ref('workflow')
const searchQuery = ref('')
const severityFilter = ref('all')
const autoScroll = ref(true)
const logContainer = ref<HTMLElement | null>(null)
const logs = ref<Log[]>([])
const panelHeight = ref(384) // Default height (h-96 = 24rem = 384px)
const isResizing = ref(false)
let startY = 0
let startHeight = 0

// Add resize handlers
const startResizing = (e: MouseEvent) => {
  e.preventDefault() // Prevent text selection
  isResizing.value = true
  startY = e.clientY
  startHeight = panelHeight.value

  // Add class to prevent text selection during resize
  document.body.classList.add('select-none')

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', stopResizing)
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isResizing.value) return
  e.preventDefault() // Prevent text selection

  // Calculate new height directly from cursor position
  const newHeight = Math.min( 
    Math.max(window.innerHeight - e.clientY, 200), // Minimum height of 200px
    window.innerHeight - 100 // Maximum height (leaving some space at top)
  )
  
  // Apply new height immediately
  panelHeight.value = newHeight
}

const stopResizing = () => {
  isResizing.value = false
  
  // Remove class that prevents text selection
  document.body.classList.remove('select-none')
  
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', stopResizing)
}

// Handle window resize
const handleWindowResize = () => { 
  panelHeight.value = Math.min(panelHeight.value, window.innerHeight - 64) // Leave space for header
}

onMounted(() => {
  window.addEventListener('resize', handleWindowResize)
})

onUnmounted(() => { 
  window.removeEventListener('resize', handleWindowResize)
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', stopResizing)
})

// Tabs configuration
const tabs = [
  { id: 'workflow', name: 'Workflow Logs' },
  { id: 'execution', name: 'Execution Logs' },
]

// Computed properties for error/warning counts
const errorCount = computed(() => logs.value.filter(log => log.severity === 'error').length)
const warningCount = computed(() => logs.value.filter(log => log.severity === 'warning').length)
const hasErrors = computed(() => errorCount.value > 0)
const hasWarnings = computed(() => warningCount.value > 0)

// Filtered logs based on search and severity
const filteredLogs = computed(() => {
  return logs.value.filter(log => {
    const matchesSearch = searchQuery.value
      ? log.message.toLowerCase().includes(searchQuery.value.toLowerCase())
      : true
    const matchesSeverity = severityFilter.value === 'all'
      ? true
      : log.severity === severityFilter.value
    return matchesSearch && matchesSeverity
  })
})

// Methods
const togglePanel = () => {
  emit('update:isExpanded', !props.isExpanded)
}

const clearLogs = () => {
  logs.value = []
}

// Auto-scroll functionality
watch(filteredLogs, () => {
  if (autoScroll.value && logContainer.value) {
    nextTick(() => {
      logContainer.value!.scrollTop = logContainer.value!.scrollHeight
    })
  }
})

// Simulated WebSocket connection for demo
let wsConnection: WebSocket | null = null

const connectWebSocket = () => {
  // In a real implementation, this would connect to your WebSocket server
  console.log('WebSocket would connect here')
  
  // Simulate incoming logs for demo purposes
  const simulateLog = () => {
    const severities = ['info', 'warning', 'error'] as const
    const messages = [
      'Workflow execution started',
      'Node processing completed',
      'Connection established',
      'Data transformation in progress',
      'API rate limit warning',
      'Invalid data format detected',
      'Network timeout occurred',
    ]
    
    logs.value.push({
      timestamp: new Date().toISOString().split('T')[1].split('.')[0],
      severity: severities[Math.floor(Math.random() * severities.length)],
      message: messages[Math.floor(Math.random() * messages.length)],
    })
  }
  
  // Simulate periodic logs
  const interval = setInterval(simulateLog, 3000)
  
  return () => clearInterval(interval)
}

// Lifecycle hooks
onMounted(() => {
  const cleanup = connectWebSocket()
  onUnmounted(cleanup)
})
</script>