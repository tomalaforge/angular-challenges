import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { defineCollection, reference, z } from 'astro:content';

const authors = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    twitter: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
  }),
});

const docs = defineCollection({
  schema: (ctx) =>
    docsSchema({
      extend: z.object({
        noCommentSection: z.boolean().optional().default(false),
        challenge: z
          .object({
            label: z.string().default('Challenge'),
            number: z.union([z.number(), z.boolean()]).default(false),
          })
          .optional(),
        author: reference('authors').optional(),
        command: z.string().optional(),
        blogLink: z.string().optional(),
        videoLink: z
          .object({
            link: z.string(),
            alt: z.string(),
            flag: z.enum(['FR']).optional(),
          })
          .optional(),
      }),
    })(ctx),
});

const i18n = defineCollection({
  type: 'data',
  schema: i18nSchema({
    extend: z.object({
      'author.createdBy': z.string(),
      'buttons.star': z.string(),
      'buttons.sponsor': z.string(),
    }),
  }),
});

export const collections = {
  docs: docs,
  i18n: i18n,
  authors: authors,
};
