import { inject } from '@angular/core';
import { RoleGuard } from './core/guard/role.guard';
import { CLIENT, MANAGER, READER, WRITER } from './user.model';

export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./dashboard/everyone.component').then(
            (m) => m.EveryoneDashboardComponent,
          ),
        canMatch: [() => inject(RoleGuard).checkRole([])],
      },
      {
        path: '',
        loadComponent: () =>
          import('./dashboard/admin.component').then(
            (m) => m.AdminDashboardComponent,
          ),
        canMatch: [() => inject(RoleGuard).checkRoleSuperAdmin()],
      },
      {
        path: '',
        loadComponent: () =>
          import('./dashboard/manager.component').then(
            (m) => m.ManagerDashboardComponent,
          ),
        canMatch: [() => inject(RoleGuard).checkRole([MANAGER])],
      },
      {
        path: '',
        loadComponent: () =>
          import('./dashboard/reader.component').then(
            (m) => m.ReaderDashboardComponent,
          ),
        canMatch: [() => inject(RoleGuard).checkRole([READER])],
      },
      {
        path: '',
        loadComponent: () =>
          import('./dashboard/writer.component').then(
            (m) => m.WriterDashboardComponent,
          ),
        canMatch: [() => inject(RoleGuard).checkRole([WRITER])],
      },
      {
        path: '',
        loadComponent: () =>
          import('./dashboard/client.component').then(
            (m) => m.ClientDashboardComponent,
          ),
        canMatch: [() => inject(RoleGuard).checkRole([CLIENT])],
      },
    ],
  },
];
