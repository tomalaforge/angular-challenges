import { Role } from './user.model';
import { inject } from '@angular/core';
import { UserStore } from './user.store';

const hasAnyRole = (roles: Role[]) => inject(UserStore).hasAnyRole(roles);
const isAdmin = () => inject(UserStore).isAdmin$;

export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canMatch: [() => isAdmin()],
    loadComponent: () => import('./dashboard/admin.component'),
  },
  {
    path: 'enter',
    canMatch: [() => hasAnyRole(['MANAGER'])],
    loadComponent: () => import('./dashboard/manager.component'),
  },
  {
    path: 'enter',
    canMatch: [() => hasAnyRole(['READER', 'WRITER'])],
    loadComponent: () => import('./dashboard/reader-writer.component'),
  },
  {
    path: 'enter',
    canMatch: [() => hasAnyRole(['CLIENT'])],
    loadComponent: () => import('./dashboard/client.component'),
  },
  {
    path: 'enter',
    loadComponent: () => import('./dashboard/public.component'),
  },
];
