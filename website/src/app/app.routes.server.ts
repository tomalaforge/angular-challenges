import { RenderMode, ServerRoute } from '@angular/ssr';
import { MANIFEST } from './generated/manifest';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'guides/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return MANIFEST.guides.map((g) => ({ slug: g.url.split('/').pop()! }));
    },
  },
  {
    path: 'challenges/:category',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return MANIFEST.challenges
        .filter((g) => g.items.some((i) => i.url === `/challenges/${g.category}`))
        .map((g) => ({ category: g.category }));
    },
  },
  {
    path: 'challenges/:category/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return MANIFEST.challenges.flatMap((g) =>
        g.items
          .filter((i) => i.url !== `/challenges/${g.category}`)
          .map((i) => ({ category: g.category, slug: i.url.split('/').pop()! })),
      );
    },
  },
  {
    // Monaco only runs in the browser; render the shell on the server.
    path: 'challenges/:category/:slug/editor',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
