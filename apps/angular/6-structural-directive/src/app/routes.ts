import { Route } from '@angular/router';
import { AuthGuard } from './dashboard/Guard/auth.guard';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canMatch: [AuthGuard],
    data: {
      roles: ['ADMIN'],
    },
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [AuthGuard],
    data: {
      roles: ['MANAGER'],
    },
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [AuthGuard],
    data: {
      roles: ['READER'],
    },
    loadComponent: () =>
      import('./dashboard/reader.component').then(
        (m) => m.ReaderDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [AuthGuard],
    data: {
      roles: ['WRITER'],
    },
    loadComponent: () =>
      import('./dashboard/writer.component').then(
        (m) => m.WriterDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [AuthGuard],
    data: {
      roles: ['CLIENT'],
    },
    loadComponent: () =>
      import('./dashboard/client.component').then(
        (m) => m.ClientDashboardComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
