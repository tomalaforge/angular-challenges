import { Routes } from '@angular/router';
import { hasRole } from './guards/role.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent,
      ),
    canMatch: [hasRole(['MANAGER'])],
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent,
      ),
    canMatch: [hasRole(['READER', 'WRITER', 'CLIENT'])],
  },
];
