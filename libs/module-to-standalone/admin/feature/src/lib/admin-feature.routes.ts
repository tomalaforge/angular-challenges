import { Route } from '@angular/router';

export const adminRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
  },
  {
    path: 'create-user',
    loadComponent: () =>
      import('./create-user/create-user.component').then(
        (m) => m.CreateUserComponent,
      ),
  },
];
