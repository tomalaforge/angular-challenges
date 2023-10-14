import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { defineCollection, z } from 'astro:content';

export const collections = {
  docs: defineCollection({
    schema: (ctx) =>
      docsSchema()(ctx).extend({
        noCommentSection: z.boolean().optional().default(false),
        challengeNumber: z.union([z.number(), z.boolean()]).default(false),
        author: z.string().optional(),
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
  }),
  i18n: defineCollection({ type: 'data', schema: i18nSchema() }),
};
