import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { map } from 'rxjs';
import {
  Role,
  admin,
  client,
  manager,
  reader,
  readerAndWriter,
  writer,
} from './user.model';
import { UserStore } from './user.store';

const canMatchRoles = (requiredRoles: Role[], requiredAdmin = false) => {
  const userStore = inject(UserStore);
  return userStore.user$.pipe(
    map((user) => {
      if (!user) return false;
      if (requiredAdmin) return user.isAdmin;

      return requiredRoles.every((role) => user.roles.includes(role));
    }),
  );
};

export const APP_ROUTES: Route[] = [
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
    canMatch: [() => canMatchRoles(admin.roles, true)],
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent,
      ),
    canMatch: [() => canMatchRoles(manager.roles)],
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/reader-and-writer.component').then(
        (m) => m.ReaderAndWriterComponent,
      ),
    canMatch: [() => canMatchRoles(readerAndWriter.roles)],
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/reader.component').then(
        (m) => m.ReaderDashboardComponent,
      ),
    canMatch: [() => canMatchRoles(reader.roles)],
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/writer.component').then(
        (m) => m.WriterDashboardComponent,
      ),
    canMatch: [() => canMatchRoles(writer.roles)],
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/client.component').then(
        (m) => m.ClientDashboardComponent,
      ),
    canMatch: [() => canMatchRoles(client.roles)],
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
  },
];
