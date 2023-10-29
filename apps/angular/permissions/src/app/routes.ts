import { inject } from '@angular/core';
import { UserStore } from './user.store';

export const canMatch = (roles: any, userStore = inject(UserStore)) =>
  userStore.hasAnyRole(roles);

export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canMatch: [() => canMatch(['ADMIN'])],
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent
      ),
  },
  {
    path: 'enter',
    canMatch: [() => canMatch(['MANAGER'])],
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent
      ),
  },
  {
    path: 'enter',
    canMatch: [() => canMatch(['CLIENT'])],
    loadComponent: () =>
      import('./dashboard/client.component').then(
        (m) => m.ClientDashboardComponent
      ),
  },
  {
    path: 'enter',
    canMatch: [() => canMatch(['WRITER'])],
    loadComponent: () =>
      import('./dashboard/writer.component').then(
        (m) => m.WriterDashboardComponent
      ),
  },
  {
    path: 'enter',
    canMatch: [() => canMatch(['READER'])],
    loadComponent: () =>
      import('./dashboard/reader.component').then(
        (m) => m.ReaderDashboardComponent
      ),
  },
];
