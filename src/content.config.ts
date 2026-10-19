import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { glossarySchema } from '@/schemas/glossary';

const glossary = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/glossary' }),
  schema: glossarySchema,
});

export const collections = { glossary };
