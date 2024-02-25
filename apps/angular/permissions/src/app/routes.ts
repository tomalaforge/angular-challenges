import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { HasPermissionGuard } from './has-permission.guard';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'no-user',
    loadComponent: () => import('./dashboard/no-user.component'),
  },
  {
    path: 'enter',
    canMatch: [() => inject(HasPermissionGuard).canMatch()],
    data: {
      isAdmin: true,
    },
    loadComponent: () => import('./dashboard/admin.component'),
  },
  {
    path: 'enter',
    canMatch: [() => inject(HasPermissionGuard).canMatch()],
    data: {
      roles: ['MANAGER'],
    },
    loadComponent: () => import('./dashboard/manager.component'),
  },
  {
    path: 'enter',
    canMatch: [() => inject(HasPermissionGuard).canMatch()],
    data: {
      roles: ['WRITER', 'READER'],
    },
    loadComponent: () => import('./dashboard/writer-reader.component'),
  },
  {
    path: 'enter',
    canMatch: [() => inject(HasPermissionGuard).canMatch()],
    data: {
      roles: ['CLIENT'],
    },
    loadComponent: () => import('./dashboard/client.component'),
  },
  {
    path: 'enter',
    loadComponent: () => import('./dashboard/everyone.component'),
  },
];
