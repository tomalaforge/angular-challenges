import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'My Docs',
      social: {
        github: 'https://github.com/withastro/starlight',
      },
      sidebar: [
        {
          label: 'Guides',
          items: [{ label: 'Example Guide', link: '/guides/example/' }],
        },
        {
          label: 'Reference',
          items: [
            {
              label: 'Example Guide',
              items: [{ label: 'Example Guide', link: '/guides/example/' }],
            },
          ],
        },
      ],
    }),
  ],
});
