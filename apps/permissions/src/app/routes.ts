import { Route } from '@angular/router';
import { HasPermissionGuard } from './has-permission.guard';
import { Role } from './user.model';

interface TypedRoute extends Route {
  data?: {
    isAdmin?: boolean;
    roles?: Role[];
  };
}

export const APP_ROUTES: TypedRoute[] = [
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
    canMatch: [HasPermissionGuard],
    data: {
      isAdmin: true,
    },
    loadComponent: () => import('./dashboard/admin.component'),
  },
  {
    path: 'enter',
    canMatch: [HasPermissionGuard],
    data: {
      roles: ['MANAGER'],
    },
    loadComponent: () => import('./dashboard/manager.component'),
  },
  {
    path: 'enter',
    canMatch: [HasPermissionGuard],
    data: {
      roles: ['WRITER', 'READER'],
    },
    loadComponent: () => import('./dashboard/writer-reader.component'),
  },
  {
    path: 'enter',
    canMatch: [HasPermissionGuard],
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
