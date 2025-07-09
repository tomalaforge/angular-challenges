import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./landing-page').then((m) => m.LandingPage),
  },
  {
    path: 'challenges',
    loadComponent: () =>
      import('./page/getting-started').then((m) => m.GettingStarted),
  },
  { path: '**', redirectTo: '' },
];
