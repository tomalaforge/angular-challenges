import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'page-1',
    loadComponent: () => import('./page-1').then((m) => m.Page1),
  },
  {
    path: 'page-2',
    loadComponent: () => import('./page-2').then((m) => m.Page2),
  },
  { path: '**', redirectTo: 'page-1' },
];
