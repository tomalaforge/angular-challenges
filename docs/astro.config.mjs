import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

export const locales = {
  root: {
    label: 'English',
    lang: 'en',
  },
  es: {
    label: 'Español',
    lang: 'es',
  },
  fr: {
    label: 'Français',
    lang: 'fr',
  },
  pt: {
    label: 'Português',
    lang: 'pt',
  },
};

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Angular Challenges',
      logo: {
        src: './public/angular-challenge.webp',
        alt: 'angular challenges logo',
      },
      favicon: './angular-challenge.ico',
      social: {
        github: 'https://github.com/tomalaforge/angular-challenges',
        linkedin: 'https://www.linkedin.com/in/thomas-laforge-2b05a945/',
        twitter: 'https://twitter.com/laforge_toma',
      },
      customCss: ['./src/styles/custom-css.css'],
      sidebar: [
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
          translations: {
            es: 'Guías',
            fr: 'Guides',
            pt: 'Guias',
          },
        },
        {
          label: 'Challenges',
          autogenerate: { directory: 'challenges' },
          translations: {
            es: 'Desafíos',
            fr: 'Challenges',
            pt: 'Desafios',
          },
        },
      ],
      head: [
        {
          tag: 'script',
          attrs: {
            src: 'https://www.googletagmanager.com/gtag/js?id=G-6BXJ62W6G5',
            async: true,
          },
        },
        {
          tag: 'script',
          content: `
            window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-6BXJ62W6G5');
          `,
        },
      ],
      components: {
        MarkdownContent: './src/components/Content.astro',
        TableOfContents: './src/components/TableOfContents.astro',
        PageTitle: './src/components/PageTitle.astro',
        MobileMenuFooter: './src/components/MobileMenuFooter.astro',
      },
      defaultLocale: 'root',
      locales,
    }),
  ],
});
