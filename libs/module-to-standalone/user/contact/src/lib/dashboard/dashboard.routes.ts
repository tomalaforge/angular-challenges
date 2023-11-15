import { Route } from '@angular/router';

export const contactDashboardRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard.component').then((m) => m.ContactDashboardComponent),
  },
];
