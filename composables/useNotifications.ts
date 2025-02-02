import { ref, onMounted, onUnmounted } from 'vue'

export interface NotificationAction {
    label: string
    handler: () => void
}

export interface Notification {
    id: string
    type: 'error' | 'warning' | 'success' | 'info'
    title: string
    message: string
    timestamp: number
    read: boolean
    action?: NotificationAction
}

export const useNotifications = () => {
    const notifications = ref<Notification[]>([])
    let ws: WebSocket | null = null

    const add = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
        const newNotification: Notification = {
            id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: Date.now(),
            read: false,
            ...notification,
        }

        notifications.value.unshift(newNotification)

        // Keep only the last 100 notifications
        if (notifications.value.length > 100) {
            notifications.value = notifications.value.slice(0, 100)
        }

        // Show browser notification if supported and permission granted
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(notification.title, {
                body: notification.message,
            })
        }
    }

    const dismiss = (id: string) => {
        notifications.value = notifications.value.filter(n => n.id !== id)
    }

    const markAsRead = (id: string) => {
        const notification = notifications.value.find(n => n.id === id)
        if (notification) {
            notification.read = true
        }
    }

    const markAllAsRead = () => {
        notifications.value.forEach(n => n.read = true)
    }

    const connectWebSocket = () => {
        // In a real implementation, this would connect to your WebSocket server
        // For demo purposes, we'll simulate notifications
        const simulateNotification = () => {
            const types = ['error', 'warning', 'success', 'info'] as const
            const titles = [
                'Workflow Execution Failed',
                'API Rate Limit Warning',
                'Workflow Completed Successfully',
                'New Team Member Added',
            ]
            const messages = [
                'The workflow "Data Sync" failed due to an API error.',
                'You are approaching your API rate limit (80% used).',
                'The workflow "Email Campaign" completed successfully.',
                'John Doe has joined your team.',
            ]

            const randomIndex = Math.floor(Math.random() * types.length)
            add({
                type: types[randomIndex],
                title: titles[randomIndex],
                message: messages[randomIndex],
                action: {
                    label: 'View Details',
                    handler: () => {
                        console.log('Viewing details for notification')
                    }
                }
            })
        }

        // Simulate periodic notifications
        const interval = setInterval(simulateNotification, 30000)

        return () => clearInterval(interval)
    }

    const requestNotificationPermission = async () => {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission()
            return permission === 'granted'
        }
        return false
    }

    onMounted(() => {
        // Request notification permission
        requestNotificationPermission()

        // Connect to WebSocket
        const cleanup = connectWebSocket()

        // Add some initial notifications for demo
        add({
            type: 'success',
            title: 'Welcome to AutomateX',
            message: 'Your workspace is ready. Start creating workflows!',
            action: {
                label: 'Create Workflow',
                handler: () => {
                    console.log('Creating new workflow')
                }
            }
        })

        onUnmounted(cleanup)
    })

    return {
        notifications,
        add,
        dismiss,
        markAsRead,
        markAllAsRead,
    }
}