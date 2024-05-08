import { inject } from '@angular/core';
import { CanMatchFn, Routes } from '@angular/router';
import { Role } from './user.model';
import { UserStore } from './user.store';

function roleGuard(...roles: Role[]): CanMatchFn {
  return () => inject(UserStore).matchesRole(roles);
}

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canMatch: [() => !inject(UserStore).user()],
    loadComponent: () => import('./dashboard/guest.component'),
  },
  {
    path: 'enter',
    canMatch: [() => inject(UserStore).isAdmin()],
    loadComponent: () => import('./dashboard/admin.component'),
  },
  {
    path: 'enter',
    canMatch: [roleGuard('MANAGER')],
    loadComponent: () => import('./dashboard/manager.component'),
  },
  {
    path: 'enter',
    canMatch: [roleGuard('CLIENT')],
    loadComponent: () => import('./dashboard/client.component'),
  },
  {
    path: 'enter',
    canMatch: [roleGuard('READER', 'WRITER')],
    loadComponent: () => import('./dashboard/reader-writer.component'),
  },
  // fall-through on 'enter' route
  {
    path: 'enter',
    loadComponent: () => import('./dashboard/everyone.component'),
  },
];
