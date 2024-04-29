import { Route } from '@angular/router';
import { hasRole, isAdmin } from './permission.guard';
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
    loadComponent: () =>
      import('./dashboard/no-user.component').then((m) => m.NoUserComponent),
  },
  {
    path: 'enter',
    canMatch: [() => isAdmin()],
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [() => hasRole([Role.MANAGER])],
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [() => hasRole([Role.WRITER, Role.READER])],
    loadComponent: () =>
      import('./dashboard/reader-writer.component').then(
        (m) => m.ReaderWriterComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [() => hasRole([Role.CLIENT])],
    loadComponent: () =>
      import('./dashboard/client.component').then((m) => m.ClientComponent),
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/public.component').then((m) => m.PublicComponent),
  },
];
