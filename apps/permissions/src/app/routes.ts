import { Route } from '@angular/router';
import { hasPermissions, isAdmin } from './guards';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    canMatch: [() => hasPermissions(['MANAGER'])],
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent
      ),
  },
  {
    path: 'dashboard',
    canMatch: [() => isAdmin()],
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent
      ),
  },
  {
    path: 'access-denied',
    loadComponent: () =>
      import('./access-denied.component').then((m) => m.AccessDeniedComponent),
  },
];
