import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard.component'),
  },
  {
    path: 'order',
    loadComponent: () => import('./order.component'),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./checkout.component'),
  },
  {
    path: 'payment',
    loadComponent: () => import('./payment.component'),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
