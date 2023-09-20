import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

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
        github: 'https://github.com/withastro/starlight',
        linkedin: 'https://www.linkedin.com/in/thomas-laforge-2b05a945/',
        twitter: 'https://twitter.com/laforge_toma',
      },
      customCss: [
        '@fontsource/ibm-plex-serif/400.css',
        '@fontsource/ibm-plex-serif/600.css',
        './src/styles/custom-css.css',
      ],
      sidebar: [
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Challenges',
          autogenerate: { directory: 'challenges' },
        },
      ],
    }),
  ],
});
