import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (_) => _.DashboardComponent,
      ),
  },
  {
    path: 'create-user',
    loadComponent: () =>
      import('./create-user/create-user.component').then(
        (_) => _.CreateUserComponent,
      ),
  },
];
