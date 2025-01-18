<template>
  <div class="bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <div class="relative isolate overflow-hidden">
      <div class="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <h1 class="mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Automate Everything, Effortlessly
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Automate tasks, optimize workflows, and integrate apps—without writing a line of code.
          </p>
          <div class="mt-10 flex items-center gap-x-6">
            <NuxtLink
              to="/signup"
              class="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Start Automating Today
            </NuxtLink>
            <NuxtLink to="#how-it-works" class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
              See How It Works <span aria-hidden="true">→</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Why AutomateX Section -->
    <div class="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-primary-600">Why AutomateX?</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Your Workflows, Automated at Scale
          </p>
          <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Save time and unlock efficiency by automating repetitive tasks. AutomateX makes automation simple, scalable, and secure.
          </p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div class="flex flex-col">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                <BoltIcon class="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                Zero-Code Automation
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p class="flex-auto">Create powerful workflows with drag-and-drop simplicity. No technical expertise required—just results.</p>
              </dd>
            </div>
            <div class="flex flex-col">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                <PuzzlePieceIcon class="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                Connect to Your Tools in Minutes
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p class="flex-auto">AutomateX connects with your favorite apps like Google Sheets, Slack, and AWS to supercharge your workflows.</p>
              </dd>
            </div>
            <div class="flex flex-col">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                <ChartBarIcon class="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                Scale with Confidence
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p class="flex-auto">As your needs grow, AutomateX scales with you. Manage data securely and build powerful automations without compromise.</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- How It Works Section -->
    <div id="how-it-works" class="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-primary-600">How It Works</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Automate in 3 Easy Steps
          </p>
          <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Getting started with AutomateX is fast and simple. Automate tasks from start to finish in three simple steps.
          </p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div class="flex flex-col items-center text-center">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                <div class="rounded-lg bg-primary-600 p-2 ring-2 ring-primary-600">
                  <span class="text-xl font-bold text-white">1</span>
                </div>
                Build Your Workflow
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p class="flex-auto">Use our intuitive interface to design workflows by dragging and dropping components. No code necessary.</p>
              </dd>
            </div>
            <div class="flex flex-col items-center text-center">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                <div class="rounded-lg bg-primary-600 p-2 ring-2 ring-primary-600">
                  <span class="text-xl font-bold text-white">2</span>
                </div>
                Define Triggers & Actions
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p class="flex-auto">Set workflows to run based on specific triggers like time, event, or user actions, and choose actions to automate tasks automatically.</p>
              </dd>
            </div>
            <div class="flex flex-col items-center text-center">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                <div class="rounded-lg bg-primary-600 p-2 ring-2 ring-primary-600">
                  <span class="text-xl font-bold text-white">3</span>
                </div>
                Monitor and Optimize
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p class="flex-auto">Track workflow performance, make real-time adjustments, and optimize efficiency with just a few clicks.</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Key Features Section -->
    <div class="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-primary-600">Key Features</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            The Power to Automate Without Limits
          </p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            <div class="flex flex-col">
              <dt class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                Drag & Drop Simplicity
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p class="flex-auto">Create custom workflows quickly with our no-code interface—just drag, drop, and connect components.</p>
              </dd>
            </div>
            <div class="flex flex-col">
              <dt class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                Instant Integrations
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p class="flex-auto">Seamlessly connect over 100+ apps and services to automate everything from data syncing to notifications.</p>
              </dd>
            </div>
            <div class="flex flex-col">
              <dt class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                End-to-End Security
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p class="flex-auto">Manage secrets, API tokens, and sensitive data securely—either globally or at the workflow level.</p>
              </dd>
            </div>
            <div class="flex flex-col">
              <dt class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                Scalable Automation
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p class="flex-auto">As your business grows, AutomateX handles increasing volume effortlessly. Manage even the most complex workflows.</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Solutions Section -->
    <div class="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-primary-600">Solutions</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Use Cases That Drive Results
          </p>
          <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            No matter your industry or use case, AutomateX can streamline and optimize your processes.
          </p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div class="flex flex-col">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                <DocumentChartBarIcon class="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                Data Automation
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p class="flex-auto">Automate the extraction, transformation, and loading (ETL) of data. Run data pipelines and manage large datasets seamlessly.</p>
              </dd>
            </div>
            <div class="flex flex-col">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                <UserGroupIcon class="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                Customer Engagement
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p class="flex-auto">Automate customer interactions with personalized email, SMS, or Slack notifications triggered by user behavior.</p>
              </dd>
            </div>
            <div class="flex flex-col">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                <Cog6ToothIcon class="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                Business Operations
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p class="flex-auto">Streamline internal processes—automate team task assignments, reporting, and tracking, so your team stays focused on what matters.</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Customer Stories Section -->
    <div class="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-primary-600">Customer Stories</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            What Our Customers Are Saying
          </p>
        </div>
        <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-16 lg:mx-0 lg:mt-20 lg:max-w-none lg:grid-cols-2">
          <div class="flex flex-col gap-y-6 rounded-2xl bg-gray-50 dark:bg-gray-800 p-8">
            <p class="text-lg leading-8 text-gray-600 dark:text-gray-300">
              "AutomateX has freed up our team to focus on strategy. The ease of use and powerful integrations made automation possible in minutes!"
            </p>
            <div class="flex items-center gap-x-4">
              <div class="text-sm leading-6">
                <p class="font-semibold text-gray-900 dark:text-white">Jane S.</p>
                <p class="text-gray-600 dark:text-gray-400">Product Manager at ShopNow</p>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-y-6 rounded-2xl bg-gray-50 dark:bg-gray-800 p-8">
            <p class="text-lg leading-8 text-gray-600 dark:text-gray-300">
              "We automated our entire data pipeline and significantly reduced manual tasks. AutomateX is the backbone of our operations now."
            </p>
            <div class="flex items-center gap-x-4">
              <div class="text-sm leading-6">
                <p class="font-semibold text-gray-900 dark:text-white">Tim R.</p>
                <p class="text-gray-600 dark:text-gray-400">Operations Director at DataFlow</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-primary-600 py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Transform Your Workflows Today
          </h2>
          <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
            Start automating in minutes. No code, no hassle—just results.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <NuxtLink
              to="/signup"
              class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Start Your Free Trial
            </NuxtLink>
            <NuxtLink
              to="/demo"
              class="text-sm font-semibold leading-6 text-white"
            >
              Book a Demo <span aria-hidden="true">→</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-900">
      <div class="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div class="flex justify-center space-x-6 md:order-2">
          <NuxtLink to="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Facebook</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
            </svg>
          </NuxtLink>
          <NuxtLink to="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Twitter</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </NuxtLink>
          <NuxtLink to="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">LinkedIn</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" />
            </svg>
          </NuxtLink>
          <NuxtLink to="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">YouTube</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clip-rule="evenodd" />
            </svg>
          </NuxtLink>
        </div>
        <div class="mt-8 md:order-1 md:mt-0">
          <p class="text-center text-xs leading-5 text-gray-500">
            &copy; {{ new Date().getFullYear() }} AutomateX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {
  BoltIcon,
  PuzzlePieceIcon,
  ChartBarIcon,
  DocumentChartBarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
} from '@heroicons/vue/24/outline'
</script>