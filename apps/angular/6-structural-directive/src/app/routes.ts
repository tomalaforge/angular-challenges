import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { Role } from './user.model';
import { UserStore } from './user.store';

const canMatchRolesGuard = (roles: Role | Role[]) =>
  inject(UserStore).hasRoles(roles);

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./login.component'),
  },
  {
    path: 'enter',
    canMatch: [() => inject(UserStore).user$()?.isAdmin],
    loadComponent: () => import('./dashboard/admin.component'),
  },
  {
    path: 'enter',
    canMatch: [() => canMatchRolesGuard('MANAGER')],
    loadComponent: () => import('./dashboard/manager.component'),
  },
  {
    path: 'enter',
    canMatch: [() => canMatchRolesGuard('CLIENT')],
    loadComponent: () => import('./dashboard/client.component'),
  },
  {
    path: 'enter',
    canMatch: [() => canMatchRolesGuard(['READER', 'WRITER'])],
    loadComponent: () => import('./dashboard/reader-writer.component'),
  },
];
