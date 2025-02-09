<template>
  <div class="bg-white dark:bg-gray-900">
    <LandingHeader />
    
    <!-- Hero Section -->
    <div class="relative isolate overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-200 to-primary-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      <div class="mx-auto max-w-7xl px-6 py-12 lg:flex lg:px-8 lg:py-20">
        <div class="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div class="mt-8">
            <a href="#" class="inline-flex space-x-6">
              <span class="rounded-full bg-primary-500/10 px-3 py-1 text-sm font-semibold leading-6 text-primary-600 ring-1 ring-inset ring-primary-500/20">Latest Update</span>
              <span class="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                <span>Now in Beta</span>
                <ChevronRightIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </a>
          </div>
          <h1 class="mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Automate Your Work <span class="text-primary-600">Without Code</span>
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Build powerful automation workflows in minutes with our intuitive drag-and-drop interface. Transform your business processes without writing a single line of code.
          </p>
          <div class="mt-10 flex items-center gap-x-6">
            <NuxtLink
              to="/auth/signup"
              class="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Get Started Free
            </NuxtLink>
            <NuxtLink to="#enterprise" class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
              Enterprise Demo <span aria-hidden="true">→</span>
            </NuxtLink>
          </div>

          <!-- Social Proof -->
          <div class="mt-10 lg:mt-12">
            
            <div class="mt-4 flex items-center gap-x-6 grayscale opacity-75" v-if="false">
              <img 
                v-for="(logo, index) in logos"
                :key="index"
                :src="logo.src"
                :alt="logo.alt"
                class="h-8 dark:invert"
              >
            </div>
          </div>
        </div>

        <!-- Hero Image -->
        <div class="mx-auto flex items-center mt-16 sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none xl:ml-32 relative">
          <div class="relative">
            <div class="absolute -inset-4">
              <div class="w-full h-full mx-auto opacity-30 blur-lg filter" style="background: linear-gradient(90deg, #6366f1 0%, #4f46e5 100%)"></div>
            </div>
            <div class="relative rounded-xl border border-gray-200 dark:border-gray-800 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden w-[600px]">
              <div class="grid grid-cols-12 gap-4 p-8">
                <!-- Workflow Nodes -->
                <div class="col-span-4 space-y-4">
                  <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center space-x-3">
                      <BoltIcon class="h-5 w-5 text-primary-600" />
                      <span class="text-sm font-medium text-gray-900 dark:text-white">Trigger</span>
                    </div>
                  </div>
                  <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center space-x-3">
                      <ArrowsPointingOutIcon class="h-5 w-5 text-primary-600" />
                      <span class="text-sm font-medium text-gray-900 dark:text-white">Transform</span>
                    </div>
                  </div>
                </div>
                <!-- Animated Lines -->
                <div class="col-span-4 flex items-center justify-center">
                  <div class="w-full h-1 bg-gradient-to-r from-primary-500 to-primary-600 animate-pulse"></div>
                </div>
                <!-- Result Nodes -->
                <div class="col-span-4 space-y-4">
                  <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center space-x-3">
                      <EnvelopeIcon class="h-5 w-5 text-primary-600" />
                      <span class="text-sm font-medium text-gray-900 dark:text-white">Notify</span>
                    </div>
                  </div>
                  <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center space-x-3">
                      <CheckCircleIcon class="h-5 w-5 text-primary-600" />
                      <span class="text-sm font-medium text-gray-900 dark:text-white">Complete</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Decorative Elements -->
              <div class="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 opacity-20 blur-2xl"></div>
              <div class="absolute bottom-0 left-0 -mb-4 -ml-4 h-24 w-24 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2 class="text-base font-semibold leading-7 text-primary-600">Enterprise-Ready</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Everything you need to scale automation
        </p>
        <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Built for enterprises, loved by teams. AutomateX provides the tools and security you need to automate with confidence.
        </p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          <div class="flex flex-col">
            <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
              <ShieldCheckIcon class="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
              Enterprise Security
            </dt>
            <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
              <p class="flex-auto">SOC 2 Type II certified. Bank-level encryption, SSO, and role-based access control.</p>
            </dd>
          </div>
          <div class="flex flex-col">
            <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
              <BoltIcon class="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
              Unlimited Scale
            </dt>
            <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
              <p class="flex-auto">Handle millions of workflows with 99.99% uptime SLA and enterprise-grade infrastructure.</p>
            </dd>
          </div>
          <div class="flex flex-col">
            <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
              <UserGroupIcon class="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
              Dedicated Support
            </dt>
            <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
              <p class="flex-auto">24/7 priority support with dedicated customer success manager and implementation team.</p>
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="relative py-24 sm:py-32 lg:pb-40">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 class="text-base font-semibold leading-7 text-primary-600">Visual Workflow Builder</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Build Enterprise Workflows in Minutes
          </p>
          <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Drag-and-drop interface meets enterprise power. Build, test, and deploy complex workflows without writing a single line of code.
          </p>
        </div>

        <div class="relative">
          <!-- Feature Grid -->
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <!-- Workflow Design -->
            <div class="rounded-2xl bg-white/5 p-8 ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 backdrop-blur-lg">
              <div class="flex items-center gap-x-3">
                <BoltIcon class="h-6 w-6 text-primary-600" />
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Intelligent Workflow Design</h3>
              </div>
              <p class="mt-4 text-sm text-gray-600 dark:text-gray-300">
                AI-powered suggestions help you build optimal workflows. Smart templates adapt to your business logic.
              </p>
              <ul class="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li class="flex gap-x-3">
                  <CheckCircleIcon class="h-5 w-5 text-primary-600 flex-none" />
                  <span>AI-powered workflow suggestions</span>
                </li>
                <li class="flex gap-x-3">
                  <CheckCircleIcon class="h-5 w-5 text-primary-600 flex-none" />
                  <span>200+ pre-built templates</span>
                </li>
                <li class="flex gap-x-3">
                  <CheckCircleIcon class="h-5 w-5 text-primary-600 flex-none" />
                  <span>Real-time collaboration</span>
                </li>
              </ul>
            </div>

            <!-- Enterprise Integration -->
            <div class="rounded-2xl bg-white/5 p-8 ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 backdrop-blur-lg">
              <div class="flex items-center gap-x-3">
                <PuzzlePieceIcon class="h-6 w-6 text-primary-600" />
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Enterprise Integration</h3>
              </div>
              <p class="mt-4 text-sm text-gray-600 dark:text-gray-300">
                Connect with your existing tools seamlessly. Native integrations with enterprise systems.
              </p>
              <ul class="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li class="flex gap-x-3">
                  <CheckCircleIcon class="h-5 w-5 text-primary-600 flex-none" />
                  <span>500+ enterprise integrations</span>
                </li>
                <li class="flex gap-x-3">
                  <CheckCircleIcon class="h-5 w-5 text-primary-600 flex-none" />
                  <span>Custom API support</span>
                </li>
                <li class="flex gap-x-3">
                  <CheckCircleIcon class="h-5 w-5 text-primary-600 flex-none" />
                  <span>Legacy system compatibility</span>
                </li>
              </ul>
            </div>

            <!-- Advanced Features -->
            <div class="rounded-2xl bg-white/5 p-8 ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 backdrop-blur-lg">
              <div class="flex items-center gap-x-3">
                <ChartBarIcon class="h-6 w-6 text-primary-600" />
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Advanced Features</h3>
              </div>
              <p class="mt-4 text-sm text-gray-600 dark:text-gray-300">
                Enterprise-grade features for complex automation needs. Full control and visibility.
              </p>
              <ul class="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li class="flex gap-x-3">
                  <CheckCircleIcon class="h-5 w-5 text-primary-600 flex-none" />
                  <span>Version control & rollback</span>
                </li>
                <li class="flex gap-x-3">
                  <CheckCircleIcon class="h-5 w-5 text-primary-600 flex-none" />
                  <span>Advanced error handling</span>
                </li>
                <li class="flex gap-x-3">
                  <CheckCircleIcon class="h-5 w-5 text-primary-600 flex-none" />
                  <span>Real-time monitoring</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Interactive Demo -->
          <div class="mt-16 rounded-3xl bg-gray-50 dark:bg-gray-900/50 p-8 ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 overflow-hidden">
            <div class="relative aspect-[16/9] overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl">
              <!-- Workflow Builder Interface -->
              <div class="absolute inset-0 flex flex-col">
                <!-- Toolbar -->
                <div class="flex-none border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-4">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                      <div class="flex items-center space-x-2">
                        <div class="h-3 w-3 rounded-full bg-red-500"></div>
                        <div class="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div class="h-3 w-3 rounded-full bg-green-500"></div>
                      </div>
                      <span class="text-sm font-medium text-gray-900 dark:text-white">Order Processing Workflow</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <button type="button" class="px-3 py-1 text-xs bg-primary-600 text-white rounded">Deploy</button>
                    </div>
                  </div>
                </div>
                
                <!-- Canvas -->
                <div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-gray-50 dark:bg-gray-900">
                  <!-- Animated Workflow Nodes -->
                  <div class="space-y-4 animate-pulse">
                    <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                      <div class="flex items-center space-x-3">
                        <ShoppingCartIcon class="h-5 w-5 text-primary-600" />
                        <span class="text-sm font-medium text-gray-900 dark:text-white">New Order</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="space-y-4 animate-pulse [animation-delay:200ms]">
                    <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                      <div class="flex items-center space-x-3">
                        <CurrencyDollarIcon class="h-5 w-5 text-primary-600" />
                        <span class="text-sm font-medium text-gray-900 dark:text-white">Payment Processing</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="space-y-4 animate-pulse [animation-delay:400ms]">
                    <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                      <div class="flex items-center space-x-3">
                        <TruckIcon class="h-5 w-5 text-primary-600" />
                        <span class="text-sm font-medium text-gray-900 dark:text-white">Shipping</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Decorative Elements -->
          <div class="absolute -left-8 -top-8 aspect-[1097/845] w-[68.5625rem] -translate-x-1/2 bg-gradient-radial from-primary-400/30 to-transparent opacity-70 blur-2xl pointer-events-none"></div>
          <div class="absolute -right-8 -bottom-8 aspect-[1097/845] w-[68.5625rem] translate-x-1/2 bg-gradient-radial from-primary-400/30 to-transparent opacity-70 blur-2xl pointer-events-none"></div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="relative isolate mt-32 px-6 py-32 sm:mt-40 sm:py-40 lg:px-8">
      <div class="absolute inset-x-0 top-0 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl" aria-hidden="true">
        <div class="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-primary-200 to-primary-600 opacity-25" style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"></div>
      </div>
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Ready to transform your enterprise?
        </h2>
        <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
          Join industry leaders who trust AutomateX for their mission-critical automation needs.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <NuxtLink
            to="/auth/signup"
            class="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Start Free Enterprise Trial
          </NuxtLink>
          <NuxtLink
            to="#contact"
            class="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Contact Sales <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="mx-auto max-w-7xl overflow-hidden px-6 pb-20 sm:pb-24 lg:px-8">
      <nav class="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
        <div class="pb-6">
          <NuxtLink to="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">About</NuxtLink>
        </div>
        <div class="pb-6">
          <NuxtLink to="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Blog</NuxtLink>
        </div>
        <div class="pb-6">
          <NuxtLink to="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Careers</NuxtLink>
        </div>
        <div class="pb-6">
          <NuxtLink to="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Press</NuxtLink>
        </div>
        <div class="pb-6">
          <NuxtLink to="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Partners</NuxtLink>
        </div>
      </nav>
      <div class="mt-10 flex justify-center space-x-10">
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
          <span class="sr-only">GitHub</span>
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
          </svg>
        </NuxtLink>
      </div>
      <p class="mt-10 text-center text-xs leading-5 text-gray-500">
        &copy; {{ new Date().getFullYear() }} AutomateX, Inc. All rights reserved.
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { 
  ChevronRightIcon, ShieldCheckIcon, BoltIcon, UserGroupIcon,
  CheckCircleIcon, PuzzlePieceIcon, ChartBarIcon,
  ShoppingCartIcon, CurrencyDollarIcon, TruckIcon,EnvelopeIcon, ArrowsPointingOutIcon
} from '@heroicons/vue/24/outline'

import LandingHeader from '~/components/layout/LandingHeader.vue'
import IllustratedFeature from '~/components/landing/IllustratedFeature.vue'

const logos = [
  {
    src: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/salesforce.svg',
    alt: 'Salesforce'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/adobe.svg',
    alt: 'Adobe'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/ibm.svg',
    alt: 'IBM'
  }
]
</script>