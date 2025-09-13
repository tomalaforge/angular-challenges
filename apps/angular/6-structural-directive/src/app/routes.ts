import { authenticatedGuard } from './guards/authenticated.guard';
import { canCanGuard } from './guards/can-can.guard';

export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canActivate: [authenticatedGuard],
    canMatch: [canCanGuard],
    data: { isAdmin: true },
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent,
      ),
  },
  {
    path: 'manager',
    canActivate: [authenticatedGuard],
    canMatch: [canCanGuard],
    data: { roles: ['MANAGER'] },
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent,
      ),
  },
  {
    path: 'reader',
    canActivate: [authenticatedGuard],
    canMatch: [canCanGuard],
    data: { roles: ['READER'] },
    loadComponent: () =>
      import('./dashboard/reader.component').then(
        (m) => m.ReaderDashboardComponent,
      ),
  },
  {
    path: 'writer',
    canActivate: [authenticatedGuard],
    canMatch: [canCanGuard],
    data: { roles: ['WRITER'] },
    loadComponent: () =>
      import('./dashboard/writer.component').then(
        (m) => m.WriterDashboardComponent,
      ),
  },
  {
    path: 'reader-writer',
    canActivate: [authenticatedGuard],
    canMatch: [canCanGuard],
    data: { roles: ['READER', 'WRITER'] },
    loadComponent: () =>
      import('./dashboard/reader-writer.component').then(
        (m) => m.ReaderWriterDashboardComponent,
      ),
  },
  {
    path: 'client',
    canActivate: [authenticatedGuard],
    canMatch: [canCanGuard],
    data: { roles: ['CLIENT'] },
    loadComponent: () =>
      import('./dashboard/client.component').then(
        (m) => m.ClientDashboardComponent,
      ),
  },
  {
    path: 'everyone',
    loadComponent: () =>
      import('./dashboard/everyone.component').then(
        (m) => m.EveryoneDashboardComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '/',
    patchMatch: 'full',
  },
];
