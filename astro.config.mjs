// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

const blogDir = new URL('./src/content/blog/', import.meta.url);
const blogLastmod = Object.fromEntries(
  readdirSync(blogDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const src = readFileSync(new URL(f, blogDir), 'utf8');
      const date =
        src.match(/^updatedDate:\s*(\S+)/m)?.[1] ?? src.match(/^pubDate:\s*(\S+)/m)?.[1];
      return [f.replace(/\.md$/, ''), date ? new Date(date).toISOString() : undefined];
    }),
);

// https://astro.build/config
export default defineConfig({
  site: 'https://www.arkava.com.co',
  vite: {
    plugins: [tailwindcss()],
    // Dependencias de las islas (carruseles, galería, hero de servicios): se
    // optimizan al arrancar el dev server. Si Vite las descubre a mitad de
    // sesión, las vuelve a optimizar y el navegador pide una versión vieja
    // (504 "Outdated Optimize Dep" → "Failed to fetch dynamically imported module").
    optimizeDeps: {
      include: ['react-slick', 'framer-motion', '@radix-ui/react-dialog', 'lucide-react', 'gsap'],
    },
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
      // lastmod real solo en artículos del blog; el resto se omite en vez de usar la fecha de build
      serialize(item) {
        const slug = item.url.match(/\/blog\/([^/]+)\/?$/)?.[1];
        if (slug && blogLastmod[slug]) item.lastmod = blogLastmod[slug];
        return item;
      },
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