import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component'),
  },
  {
    path: 'create-contact',
    loadComponent: () => import('./create-contact/create-contact.component'),
  },
];
