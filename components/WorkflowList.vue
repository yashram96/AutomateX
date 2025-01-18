<template>
  <div class="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow">
    <div class="p-6">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Recent Workflows</h3>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <select class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 dark:text-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6">
            <option>Most Recent</option>
            <option>Most Used</option>
            <option>Favorites</option>
          </select>
        </div>
      </div>
      <div class="mt-6 flow-root">
        <ul role="list" class="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
          <li v-for="workflow in workflows" :key="workflow.name" class="py-5">
            <div class="relative flex items-center space-x-4">
              <div class="flex-shrink-0">
                <span class="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900">
                  <component :is="workflow.icon" class="h-6 w-6 text-primary-700 dark:text-primary-300" aria-hidden="true" />
                </span>
              </div>
              <div class="min-w-0 flex-1">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ workflow.name }}</h4>
                <p class="truncate text-sm text-gray-500 dark:text-gray-400">{{ workflow.description }}</p>
              </div>
              <div class="flex flex-shrink-0 space-x-2">
                <button 
                  type="button" 
                  class="rounded-md bg-white dark:bg-gray-800 p-2 text-gray-400 hover:text-gray-500"
                  @click="runWorkflow(workflow)"
                >
                  <PlayIcon class="h-5 w-5" />
                </button>
                <button 
                  type="button" 
                  class="rounded-md bg-white dark:bg-gray-800 p-2 text-gray-400 hover:text-gray-500"
                  @click="editWorkflow(workflow)"
                >
                  <PencilIcon class="h-5 w-5" />
                </button>
                <button 
                  type="button" 
                  class="rounded-md bg-white dark:bg-gray-800 p-2 text-gray-400 hover:text-gray-500"
                  @click="duplicateWorkflow(workflow)"
                >
                  <DocumentDuplicateIcon class="h-5 w-5" />
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlayIcon, PencilIcon, DocumentDuplicateIcon } from '@heroicons/vue/24/outline'
import { BoltIcon, EnvelopeIcon, CalendarIcon, DocumentTextIcon } from '@heroicons/vue/24/outline'

const router = useRouter()

const editWorkflow = (workflow: any) => {
  router.push(`/workflows/editor/${workflow.id}`)
}

const runWorkflow = (workflow: any) => {
  // TODO: Implement workflow execution
  console.log('Running workflow:', workflow.id)
}

const duplicateWorkflow = (workflow: any) => {
  // TODO: Implement workflow duplication
  console.log('Duplicating workflow:', workflow.id)
}

// Create sample workflow data

const emailWorkflow = {
  workflow_name: "Email Notification Flow",
  description: "Sends email notifications when new documents are uploaded.",
  version: 1,
  created_by: "user-456",
  created_at: "2024-04-03T10:00:00.000Z",
  updated_by: "user-789",
  updated_at: "2024-04-03T12:34:56.789Z",
  viewport: {
    x: 0,
    y: 0,
    zoom: 1
  },
  nodes: [
    {
      id: "node-1",
      type: "input",
      position: { x: 100, y: 100 },
      data: {
        label: "Google Docs Trigger",
        icon: "DocumentTextIcon",
        config: {
          watchFolder: "/uploads",
          fileTypes: ["*.doc", "*.pdf"]
        }
      }
    },
    {
      id: "node-2",
      type: "default",
      position: { x: 400, y: 100 },
      data: {
        label: "Email Notification",
        icon: "ChatBubbleLeftRightIcon",
        config: {
          to: "team@example.com",
          template: "new-document-template"
        }
      }
    }
  ],
  edges: [
    {
      id: "edge-1",
      source: "node-1",
      target: "node-2",
      type: "smoothstep",
      animated: true,
      label: "On new document",
      data: {
        condition: "fileType === 'pdf'"
      }
    }
  ]
}
const documentWorkflow = {
  workflow: {
    metadata: {
      workflow_id: "wf-123",
      name: "Document Processing Workflow",
      description: "Processes uploaded documents and sends notifications",
      version: 1,
      status: "active",
      created_by: "user-456",
      created_at: "2024-04-03T10:00:00.000Z",
      updated_by: "user-789",
      updated_at: "2024-04-03T12:34:56.789Z",
      tags: ["documents", "notifications"]
    },
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
    nodes: [
      {
        id: "node-1",
        type: "custom",
        position: { x: 100, y: 100 },
        data: {
          label: "Document Upload Trigger",
          icon: "DocumentTextIcon",
          type: "trigger",
          config: { 
            source: "google_drive", 
            watchFolder: "/uploads", 
            fileTypes: ["*.doc", "*.pdf"] 
          }
        },
        style: { width: 200, height: 100 },
        dragHandle: ".custom-node-header",
        connectable: true,
        selectable: true,
        sourcePosition: "Right",
        targetPosition: "Left"
      }
    ],
    edges: [
      {
        id: "edge-1",
        source: "node-1",
        target: "node-2",
        sourceHandle: "output",
        targetHandle: "input",
        type: "smoothstep",
        animated: true,
        style: { stroke: "#0077ff", strokeWidth: 2 },
        markerEnd: { type: "arrow" },
        data: { label: "Document Ready", condition: "fileSize < 10000000" }
      }
    ],
    execution: {
      timeout: 300,
      retry: { attempts: 3, backoff: "exponential" },
      error_handling: { on_failure: "notify_admin" }
    }
  }
}
const sampleWorkflow = {
  workflow: {
    metadata: {
      id: 'sample-data-pipeline',
      name: 'Sample Data Pipeline',
      description: 'A sample workflow demonstrating data processing and automation',
      version: 1,
      status: 'active',
      created_by: 'user-123',
      created_at: new Date().toISOString(),
      updated_by: 'user-123',
      updated_at: new Date().toISOString(),
      tags: ['sample', 'data', 'automation']
    },
    nodes: [
      {
        id: 'node-1',
        type: 'custom',
        position: { x: 100, y: 100 },
        data: {
          label: 'Database Source',
          icon: 'CircleStackIcon',
          type: 'source',
          config: {
            source_type: 'postgresql',
            query: 'SELECT * FROM users',
          }
        },
        dragHandle: '.custom-node-header',
        connectable: true,
        selectable: true,
      },
      {
        id: 'node-2',
        type: 'custom',
        position: { x: 400, y: 100 },
        data: {
          label: 'Data Transformer',
          icon: 'ArrowsPointingOutIcon',
          type: 'processor',
          config: {
            operations: ['remove_nulls', 'standardize_dates'],
            output_format: 'json'
          }
        },
        dragHandle: '.custom-node-header',
        connectable: true,
        selectable: true,
      },
      {
        id: 'node-3',
        type: 'custom',
        position: { x: 700, y: 100 },
        data: {
          label: 'Send Email',
          icon: 'MailIcon',
          type: 'action',
          config: {
            action_type: 'send_email',
            recipients: 'team@example.com',
            template: 'data-report'
          }
        },
        dragHandle: '.custom-node-header',
        connectable: true,
        selectable: true,
      }
    ],
    edges: [
      {
        id: 'edge-1',
        source: 'node-1',
        target: 'node-2',
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#0077ff', strokeWidth: 2 },
        markerEnd: { type: 'arrow' }
      },
      {
        id: 'edge-2',
        source: 'node-2',
        target: 'node-3',
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#0077ff', strokeWidth: 2 },
        markerEnd: { type: 'arrow' }
      }
    ]
  }
}

// Save sample workflow to localStorage on component mount
onMounted(() => {
  localStorage.setItem('workflow-sample-data-pipeline', JSON.stringify(sampleWorkflow))
  localStorage.setItem('workflow-wf-123', JSON.stringify(documentWorkflow))
  localStorage.setItem('workflow-email-notification-flow', JSON.stringify(emailWorkflow))
})

const workflows = [
  {
    id: 'email-notification-flow',
    name: 'Email Notification Flow',
    description: 'Sends email notifications when new documents are uploaded.',
    icon: EnvelopeIcon,
  },
  {
    id: 'wf-123',
    name: 'Document Processing Workflow',
    description: 'Processes uploaded documents and sends notifications',
    icon: DocumentTextIcon,
  },
  {
    id: 'sample-data-pipeline',
    name: 'Sample Data Pipeline',
    description: 'A sample workflow demonstrating data processing and automation',
    icon: BoltIcon,
  },
  {
    id: 'email-automation',
    name: 'Email Campaign Automation',
    description: 'Triggers personalized email sequences based on user actions',
    icon: EnvelopeIcon,
  },
  {
    id: 'calendar-sync',
    name: 'Calendar Integration',
    description: 'Automatically schedules meetings and sends reminders',
    icon: CalendarIcon,
  },
]
</script>