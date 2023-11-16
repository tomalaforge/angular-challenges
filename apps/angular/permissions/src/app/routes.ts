import { Route } from '@angular/router';
import { Role } from './user.model';
import { HasPermission } from './common/guards/is-admin.guard';
export interface TypedRoute extends Route {
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
    path: 'enter',
    canMatch: [HasPermission],
    data: {
      isAdmin: true,
    },
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent
      ),
  },
  {
    path: 'enter',
    canMatch: [HasPermission],
    data: {
      roles: ['MANAGER'],
    },
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent
      ),
  },
  {
    path: 'enter',
    canMatch: [HasPermission],
    data: {
      roles: ['CLIENT'],
    },
    loadComponent: () =>
      import('./dashboard/client.component').then(
        (m) => m.ClientDashboardComponent
      ),
  },
  {
    path: 'enter',
    canMatch: [HasPermission],
    data: {
      roles: ['READER'],
    },
    loadComponent: () =>
      import('./dashboard/reader.component').then(
        (m) => m.ReaderDashboardComponent
      ),
  },
  {
    path: 'enter',
    canMatch: [HasPermission],
    data: {
      roles: ['WRITER'],
    },
    loadComponent: () =>
      import('./dashboard/writer.component').then(
        (m) => m.WriterDashboardComponent
      ),
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/everyone.component').then(
        (m) => m.EveryoneDashboardComponent
      ),
  },
];
