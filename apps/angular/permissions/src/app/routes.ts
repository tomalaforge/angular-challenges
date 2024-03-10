import { authGuardGuard } from './authGuard.guard';
import { AdminDashboardComponent } from './dashboard/admin.component';
import { ManagerDashboardComponent } from './dashboard/manager.component';
//import { CanActivate } from '@angular/router';

export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    component: AdminDashboardComponent,
    canActivate: [authGuardGuard],
  },
  // {
  //   path: 'enter',
  //   loadComponent: () =>
  //     import('./dashboard/admin.component').then(
  //       (m) => m.AdminDashboardComponent,
  //     ),
  //     CanActivate:[authGuardGuard]
  // },
  {
    path: 'manager',
    component: ManagerDashboardComponent,
    CanActivate: [authGuardGuard],
  },
];
