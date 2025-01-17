<template>
  <div class="flex h-screen flex-col">
    <!-- Editor Header -->
    <div class="sticky top-0 z-10 flex-none border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4">
      <div class="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div class="flex items-center">
          <NuxtLink
            to="/"
            class="mr-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <ArrowLeftIcon class="h-6 w-6" />
          </NuxtLink>
          <h1 class="text-lg font-semibold text-gray-900 dark:text-white">{{ workflowName }}</h1>
        </div>
        <div class="flex items-center space-x-2">
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
            v-model="elements"
            :default-viewport="{ zoom: 1 }"
            :min-zoom="0.2"
            :max-zoom="4"
            class="h-full"
            @drop="onDrop"
            @dragover="onDragOver"
            fit-view-on-init
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
                  id="search-components"
                  class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 dark:text-white dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  placeholder="Search components"
                />
              </div>
            </div>

            <div class="space-y-4">
              <div v-for="category in componentCategories" :key="category.name">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ category.name }}</h3>
                <div class="mt-2 grid grid-cols-2 gap-2">
                  <div
                    v-for="component in category.components"
                    :key="component.name"
                    class="group relative flex items-center space-x-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 shadow-sm hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2"
                    draggable
                    @dragstart="onDragStart($event, component)"
                  >
                    <div class="flex-shrink-0">
                      <component :is="component.icon" class="h-5 w-5 text-gray-400 group-hover:text-primary-500" />
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { VueFlow, useVueFlow, Panel } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import CustomNode from '~/components/workflow/CustomNode.vue'
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
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
const colorMode = useColorMode()

// Ensure we have a valid ID parameter
if (!route.params.id) {
  router.push('/')
}

const workflowName = computed(() => decodeURIComponent(route.params.id as string))
const debugMessage = ref('Ready to build workflow')
const isDark = computed(() => colorMode.value === 'dark')

const elements = ref([])
const { addNodes, addEdges, project } = useVueFlow()

const onDragStart = (event: DragEvent, component: any) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', JSON.stringify(component))
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
  const data = JSON.parse(event.dataTransfer?.getData('application/vueflow') || '{}')
  const position = project({ x: event.clientX, y: event.clientY })

  const newNode = {
    id: `node-${Date.now()}`,
    type: 'custom',
    position,
    data: { 
      label: data.name,
      icon: data.iconName,
    },
  }

  addNodes([newNode])
  debugMessage.value = `Added ${data.name} component`
}

const componentCategories = [
  {
    name: 'Popular Integrations',
    components: [
      { name: 'Google Docs', icon: DocumentTextIcon, iconName: 'DocumentTextIcon' },
      { name: 'Slack', icon: ChatBubbleLeftRightIcon, iconName: 'ChatBubbleLeftRightIcon' },
      { name: 'Trello', icon: DocumentTextIcon, iconName: 'DocumentTextIcon' },
      { name: 'Email', icon: ChatBubbleLeftRightIcon, iconName: 'ChatBubbleLeftRightIcon' },
    ],
  },
  {
    name: 'Logic Components',
    components: [
      { name: 'If/Else', icon: ArrowsPointingOutIcon, iconName: 'ArrowsPointingOutIcon' },
      { name: 'Loop', icon: ArrowPathRoundedSquareIcon, iconName: 'ArrowPathRoundedSquareIcon' },
      { name: 'Delay', icon: ArrowsPointingInIcon, iconName: 'ArrowsPointingInIcon' },
    ],
  },
  {
    name: 'AI Components',
    components: [
      { name: 'AI Bot', icon: BoltIcon, iconName: 'BoltIcon' },
      { name: 'Custom API', icon: CloudIcon, iconName: 'CloudIcon' },
    ],
  },
]
</script>