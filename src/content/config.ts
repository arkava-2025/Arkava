import { defineCollection, z } from 'astro:content';

const faqs = defineCollection({
  schema: z.object({
    question: z.string(),
    answer: z.string(),
  }),
});

const testimonials = defineCollection({
  schema: z.object({
    quote: z.string(),
    name: z.string(),
    role: z.string().optional(),
    company: z.string().optional(),
    avatarUrl: z.string().url().optional(),
    featured: z.boolean().optional(),
  }),
});

const blog = defineCollection({
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    pubDate:     z.date(),
    author:      z.string().default('Equipo Arkava'),
    category:    z.string(),
    tags:        z.array(z.string()).optional(),
    image:       z.string().optional(),
    imageAlt:    z.string().optional(),
    featured:    z.boolean().optional(),
    readTime:    z.number().optional(),
  }),
});

export const collections = {
  faqs,
  testimonials,
  blog,
};
