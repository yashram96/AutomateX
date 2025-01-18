import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0eeff',
          200: '#bae2ff',
          300: '#7cc4ff',
          400: '#3b9eff',
          500: '#0077ff',
          600: '#0057d5',
          700: '#0042a0',
          800: '#003380',
          900: '#002966',
        },
        background: {
          light: '#ffffff',
          dark: '#0a0a0f',
        },
        surface: {
          light: '#f8fafc',
          dark: '#111116',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} satisfies Config