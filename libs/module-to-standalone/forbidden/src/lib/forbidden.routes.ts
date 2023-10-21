import { Route } from '@angular/router';

export const forbiddenRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./forbidden.component').then((m) => m.ForbiddenComponent),
  },
];
