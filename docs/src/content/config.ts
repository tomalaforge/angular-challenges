import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { defineCollection, z } from 'astro:content';

export const collections = {
  docs: defineCollection({
    schema: (ctx) =>
      docsSchema()(ctx).extend({
        // Add a new optional field to the schema.
        noCommentSection: z.boolean().optional(),
      }),
  }),
  i18n: defineCollection({ type: 'data', schema: i18nSchema() }),
};
