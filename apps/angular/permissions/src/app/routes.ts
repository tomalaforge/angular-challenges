import { AdminDashboardComponent } from './dashboard/admin.component';
import { LoginComponent } from './login.component';

export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () => LoginComponent,
  },
  {
    path: 'enter',
    loadComponent: () => AdminDashboardComponent,
  },
];
