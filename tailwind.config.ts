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
          50: '#f4f6ff',
          100: '#e8ebff',
          200: '#d5daff',
          300: '#b4bcff',
          400: '#8b94ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        background: {
          light: '#ffffff',
          dark: '#0a0a0f',
        },
        surface: {
          light: '#fafafa',
          dark: '#111116',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('https://tailwindui.com/img/beams-home@95.jpg')",
        'grid-pattern': "url('https://tailwindui.com/img/grid.svg')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} satisfies Config