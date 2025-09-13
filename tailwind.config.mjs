import { defineConfig } from 'tailwindcss'

export default defineConfig({
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {
      colors: {
        primary: '#AE9A91',
        secondary: '#AE9A91',
        tertiary: '#AE9A91',
      },
    },
  },
  plugins: [],
})