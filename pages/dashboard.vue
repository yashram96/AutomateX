<script setup lang="ts">
definePageMeta({
  layout: 'authenticated',
  middleware: ['auth']
})
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <WelcomeHeader />
      
      <div class="mt-8">
        <OverviewStats />
      </div>

      <div class="mt-8">
        <QuickActions />
      </div>

      <div class="mt-8">
        <WorkflowList />
      </div>

      <div class="mt-8">
        <IntegrationCenter />
      </div>

      <div class="mt-8 mb-12">
        <HelpSection />
      </div>
    </div>
  </div>
</template>