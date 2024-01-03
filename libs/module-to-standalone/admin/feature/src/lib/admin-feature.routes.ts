import { Routes } from '@angular/router';

import { CreateUserComponent } from './create-user/create-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'create-user',
    children: [
      {
        path: '',
        component: CreateUserComponent,
      },
    ],
  },
];
