import { Routes } from '@angular/router';
import { docResolver } from './pages/docs/doc-resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/landing/landing').then((m) => m.Landing),
  },
  {
    // Full-viewport page, outside the docs layout (no sidebar).
    path: 'challenges/:category/:slug/editor',
    loadComponent: () => import('./pages/editor/editor-page').then((m) => m.EditorPage),
  },
  {
    path: '',
    loadComponent: () => import('./layout/docs-layout').then((m) => m.DocsLayout),
    children: [
      {
        path: 'guides/:slug',
        resolve: { doc: docResolver },
        loadComponent: () => import('./pages/docs/doc-page').then((m) => m.DocPage),
      },
      {
        path: 'challenges/:category',
        resolve: { doc: docResolver },
        loadComponent: () => import('./pages/docs/doc-page').then((m) => m.DocPage),
      },
      {
        path: 'challenges/:category/:slug',
        resolve: { doc: docResolver },
        loadComponent: () => import('./pages/docs/doc-page').then((m) => m.DocPage),
      },
      {
        path: 'challenges/:category/:slug/solutions',
        resolve: { doc: docResolver },
        loadComponent: () =>
          import('./pages/solutions/solutions-list').then((m) => m.SolutionsList),
      },
      {
        path: 'challenges/:category/:slug/solutions/:pr',
        resolve: { doc: docResolver },
        loadComponent: () => import('./pages/solutions/solution-diff').then((m) => m.SolutionDiff),
      },
      {
        path: 'leaderboard/:board',
        loadComponent: () => import('./pages/leaderboard/leaderboard').then((m) => m.Leaderboard),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
