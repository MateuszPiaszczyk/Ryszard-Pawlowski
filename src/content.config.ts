import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Kolekcja wpisów blogowych (Astro Content Layer).
 * Treść w plikach Markdown — łatwa do edycji bez znajomości kodu.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('ks. Ryszard Pawłowski'),
    category: z.string().default('Świadectwa'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
