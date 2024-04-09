import { inject } from '@angular/core';
import { AdminDashboardComponent } from './dashboard/admin.component';
import { ManagerDashboardComponent } from './dashboard/manager.component';
import { LoginComponent } from './login.component';
import { Role } from './user.model';
import { UserStore } from './user.store';

export const canMatchRole = (roles: Role[], userStore = inject(UserStore)) =>
  !!roles.some((r) => userStore.user()?.roles.includes(r));

export const canMatchIsAdmin = (
  isAdmin = true,
  userStore = inject(UserStore),
) => isAdmin === userStore.user()?.isAdmin;

export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () => LoginComponent,
  },
  {
    path: 'enter',
    canMatch: [() => canMatchIsAdmin()],
    loadComponent: () => AdminDashboardComponent,
  },
  {
    path: 'enter',
    canMatch: [() => canMatchRole([Role.MANAGER])],
    loadComponent: () => ManagerDashboardComponent,
  },
];
