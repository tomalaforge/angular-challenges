import { Route } from '@angular/router';

import { hasRole, isAdmin } from './has-permission.guard';
import { Role } from './user.model';

const routeData = (roles: Role[] | null, isAdmin?: boolean) => {
  return isAdmin ? { isAdmin } : { roles };
};

export const APP_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./login.component'),
  },
  {
    path: 'no-user',
    loadComponent: () => import('./dashboard/no-user.component'),
  },
  {
    path: 'enter',
    canMatch: [() => isAdmin()],
    data: routeData(null, true),
    loadComponent: () => import('./dashboard/admin.component'),
  },
  {
    path: 'enter',
    canMatch: [() => hasRole(['MANAGER'])],
    data: routeData(['MANAGER']),
    loadComponent: () => import('./dashboard/manager.component'),
  },
  {
    path: 'enter',
    canMatch: [() => hasRole(['WRITER', 'READER'])],
    data: routeData(['WRITER', 'READER']),
    loadComponent: () => import('./dashboard/writer-reader.component'),
  },
  {
    path: 'enter',
    canMatch: [() => hasRole(['CLIENT'])],
    data: routeData(['CLIENT']),
    loadComponent: () => import('./dashboard/client.component'),
  },
  {
    path: 'enter',
    loadComponent: () => import('./dashboard/everyone.component'),
  },
];
