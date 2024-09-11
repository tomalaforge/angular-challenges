import { Route } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const adminRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
  },
];
