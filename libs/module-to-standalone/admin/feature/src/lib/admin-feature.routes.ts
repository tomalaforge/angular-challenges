import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardModule),
  },
  {
    path: 'create-user',
    loadChildren: () =>
      import('./create-user/create-user.component').then(
        (m) => m.CreateUserModule,
      ),
  },
];
