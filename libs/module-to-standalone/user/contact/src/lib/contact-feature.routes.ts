import { Routes } from '@angular/router';
export const contactRoutes: Routes = [
  {
    path: 'contact-dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
  },
  {
    path: 'create-contact',
    loadComponent: () => import('./create-contact/create-contact.component'),
  },
];
