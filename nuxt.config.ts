// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],
  css: [
    '~/assets/css/workflow-editor.css'
  ],
  colorMode: {
    classSuffix: ''
  },
  vite: {
    server: {
      watch: {
        usePolling: true, // Enables polling mode
        interval: 10,    // Check every 100ms
      },
      hmr: {
        port: 24678, // Default Vite HMR port
      },
    },
  },
})
