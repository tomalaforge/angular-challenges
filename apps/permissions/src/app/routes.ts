import { inject } from '@angular/core';
import { UserStore } from './user.store';
import { Role } from './user.model';

export function hasAnyRole(role: Role | Role[]): boolean {
  const store = inject(UserStore);
  return store.hasAnyRole(role);
}

export function isAdmin(): boolean {
  const store = inject(UserStore);
  return store.user().isAdmin;
}

export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canMatch: [() => isAdmin()],
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent
      ),
  },
  {
    path: 'enter',
    canMatch: [() => hasAnyRole('MANAGER')],
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent
      ),
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/no-access.component').then(
        (m) => m.NoAccessDashboardComponent
      ),
  },
];
