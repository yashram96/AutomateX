<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="h-screen overflow-y-auto custom-scrollbar">
      <TheSidebar
        :isSidebarOpen="isSidebarOpen"
        :isCollapsed="isCollapsed"
        @update:isSidebarOpen="isSidebarOpen = $event"
        @update:isCollapsed="isCollapsed = $event"
      />
      <TheHeader @toggle-sidebar="toggleSidebar" />
      <main
        :class="[
          'pt-24 pb-2 transition-all duration-300',
          isCollapsed ? 'lg:pl-20' : 'lg:pl-72',
        ]"
      >
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheHeader from '~/components/layout/TheHeader.vue'
import TheSidebar from '~/components/layout/TheSidebar.vue'

const isSidebarOpen = ref(false)
const isCollapsed = ref(true)
const collapsedWidth = 16

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Handle mouse movement for sidebar expansion
const handleMouseMove = (event: MouseEvent) => {
  if (event.clientX <= collapsedWidth) {
    isCollapsed.value = false
  } else if (event.clientX > 288) {
    isCollapsed.value = true
  }
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
})
</script>