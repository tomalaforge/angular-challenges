import { hasRoleGuard } from './hasRole.guard';
import { isAdminGuard } from './isAdmin.guard';

export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canMatch: [isAdminGuard],
    loadComponent: () => import('./dashboard/admin.component'),
  },
  {
    path: 'enter',
    canMatch: [() => hasRoleGuard(['MANAGER'])],
    loadComponent: () => import('./dashboard/manager.component'),
  },
  {
    path: 'enter',
    canMatch: [() => hasRoleGuard(['CLIENT'])],
    loadComponent: () => import('./dashboard/client.component'),
  },
  {
    path: 'enter',
    canMatch: [() => hasRoleGuard(['READER', 'WRITER'])],
    loadComponent: () => import('./dashboard/reader-writer.component'),
  },
  {
    path: 'enter',
    loadComponent: () => import('./dashboard/everyone.component'),
  },
];
