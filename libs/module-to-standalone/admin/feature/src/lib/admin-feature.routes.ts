import { Route } from '@angular/router';

export const ADMIN_FEATURE_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (c) => c.DashboardComponent,
      ),
  },
  {
    path: 'create-user',
    loadComponent: () =>
      import('./create-user/create-user.component').then(
        (c) => c.CreateUserComponent,
      ),
  },
];

export default ADMIN_FEATURE_ROUTES;
