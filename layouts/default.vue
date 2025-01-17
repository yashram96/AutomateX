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
import TheHeader from '~/components/layout/TheHeader.vue';
import TheSidebar from '~/components/layout/TheSidebar.vue';

const isSidebarOpen = ref(false);
const isCollapsed = ref(true);
const collapsedWidth = 16; // 4rem = 16px

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// Handle mouse movement for sidebar expansion
const handleMouseMove = (event: MouseEvent) => {
  if (event.clientX <= collapsedWidth) {
    isCollapsed.value = false;
  } else if (event.clientX > 288) {
    // 72px (collapsed width) + some buffer
    isCollapsed.value = true;
  }
};

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove);
});
</script>

<style>
.custom-scrollbar {
  scrollbar-width: 6px;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
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
