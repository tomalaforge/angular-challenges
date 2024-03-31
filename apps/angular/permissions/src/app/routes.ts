import { authGuardGuard } from './authGuard.guard';

export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent,
      ),
    canActivate: [authGuardGuard],
  },
  {
    path: 'manager',
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent,
      ),
    canActivate: [authGuardGuard],
  },
  {
    path: 'reader',
    loadComponent: () =>
      import('./dashboard/reader.component').then(
        (m) => m.ReaderDashboardComponent,
      ),
    canActivate: [authGuardGuard],
  },
  {
    path: 'writer',
    loadComponent: () =>
      import('./dashboard/writer.component').then(
        (m) => m.WriterDashboardComponent,
      ),
    canActivate: [authGuardGuard],
  },
  {
    path: 'readerandwriter',
    loadComponent: () =>
      import('./dashboard/readerandwriter.component').then(
        (m) => m.ReaderAndWriterDashboardComponent,
      ),
    canActivate: [authGuardGuard],
  },
  {
    path: 'client',
    loadComponent: () =>
      import('./dashboard/client.component').then(
        (m) => m.ClientDashboardComponent,
      ),
    canActivate: [authGuardGuard],
  },
  {
    path: 'everyone',
    loadComponent: () =>
      import('./dashboard/everyone.component').then(
        (m) => m.EveryoneDashboardComponent,
      ),
    canActivate: [authGuardGuard],
  },
];
