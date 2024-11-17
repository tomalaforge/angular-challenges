import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
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
