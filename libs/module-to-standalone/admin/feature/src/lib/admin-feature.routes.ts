import { Route } from '@angular/router';

export const adminFeatureRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component'),
  },
  {
    path: 'create-user',
    loadComponent: () => import('./create-user/create-user.component'),
  },
];
