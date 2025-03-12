import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { Role } from './user.model';
import { UserStore } from './user.store';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canMatch: [() => inject(UserStore)?.isAdmin() ?? false],
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [() => userHasPermission(['MANAGER'])],
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [() => userHasPermission(['READER', 'WRITER'])],
    loadComponent: () =>
      import('./dashboard/reader-writer.component').then(
        (m) => m.ReaderWriterDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [() => userHasPermission(['CLIENT'])],
    loadComponent: () =>
      import('./dashboard/client.component').then(
        (m) => m.ClientDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [() => false],
    redirectTo: 'access-denied',
  },
  {
    path: 'access-denied',
    loadComponent: () =>
      import('./dashboard/access-denied.component').then(
        (m) => m.AccessDeniedComponent,
      ),
  },
];

export function userHasPermission(roles: Role[]) {
  const service = inject(UserStore);

  return service.userHasRole(roles);
}
