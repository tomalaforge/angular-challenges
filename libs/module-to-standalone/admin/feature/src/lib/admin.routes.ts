import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component'),
  },
  {
    path: 'create-user',
    loadComponent: () => import('./create-user/create-user.component'),
  },
];

export default routes;
