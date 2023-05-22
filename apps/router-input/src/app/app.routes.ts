import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./home.component'),
  },
  {
    path: 'test/:testId',
    loadComponent: () => import('./test.component'),
    data: {
      permission: 'admin',
    },
  },
];
