// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://arkava.com.co',
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@styles': '/src/styles',
        '@lib': '/src/lib',
      },
    },
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/draft'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-CO',
        },
      },
    }),
  ],
  image: {
    domains: [
      'media.graphassets.com',
      'res.cloudinary.com',
      'jbmqxuofkzwe1rde.public.blob.vercel-storage.com',
      'framerusercontent.com',
    ],
  },
});