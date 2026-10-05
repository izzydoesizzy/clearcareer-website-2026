import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    author: z.string().default('Izzy Piyale-Sheard'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.enum(['job-search-strategy', 'resume-linkedin', 'interviews', 'salary-negotiation', 'ai-tools-mindset', 'financial-planning', 'announcement']).default('announcement'),
    type: z.enum(['playbook', 'article']).default('article'),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
