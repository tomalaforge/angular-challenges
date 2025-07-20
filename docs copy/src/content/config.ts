import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { defineCollection, reference, z } from 'astro:content';

const authors = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    twitter: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    youtube: z.string().url().optional(),
  }),
});

const docs = defineCollection({
  schema: (ctx) =>
    docsSchema({
      extend: z.object({
        noCommentSection: z.boolean().optional().default(false),
        challengeNumber: z.union([z.number(), z.boolean()]).default(false),
        author: reference('authors').optional(),
        contributors: z.array(z.string()).optional(),
        command: z.string().optional(),
        blogLink: z.string().optional(),
        videoLinks: z
          .array(
            z.object({
              link: z.string(),
              alt: z.string(),
              flag: z.enum(['FR', 'ES']).optional(),
            }),
          )
          .optional(),
      }),
    })(ctx),
});

const i18n = defineCollection({
  type: 'data',
  schema: i18nSchema({
    extend: z
      .object({
        'page.title.challenge': z.string(),
        'author.createdBy': z.string(),
        'buttons.email': z.string(),
        'buttons.star': z.string(),
        'buttons.sponsor': z.string(),
        'buttons.clipboardCopy': z.string(),
        'challenge.footer.note': z.string(),
        'challenge.footer.running': z.string(),
        'challenge.footer.start': z.string(),
        'challenge.footer.reminder': z.string(),
        'challenge.footer.communityAnswers': z.string(),
        'challenge.footer.authorAnswer': z.string(),
        'challenge.footer.blogPost': z.string(),
        'challenge.footer.video': z.string(),
        'challenge.footer.gettingStarted.title': z.string(),
        'challenge.footer.gettingStarted.link': z.string(),
        'challenge.footer.upvoteAnswer': z.string(),
        'subscription.button': z.string(),
        'subscription.email': z.string(),
        'subscription.note.title': z.string(),
        'subscription.note.description': z.string(),
        'contributor.title': z.string(),
        'contributor.subtitle': z.string(),
        'sponsors.description': z.string(),
        'sponsors.joinButton': z.string(),
      })
      .partial(),
  }),
});

export const collections = {
  docs: docs,
  i18n: i18n,
  authors: authors,
};
