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

export const collections = {
  faqs,
  testimonials,
};
