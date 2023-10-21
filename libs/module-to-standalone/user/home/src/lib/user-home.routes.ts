import { Route } from '@angular/router';

export const userHomeRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./home.component').then((m) => m.UserHomeComponent),
  },
];
