import { Routes } from '@angular/router';

export const contactFeatureRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (c) => c.ContactDashboardComponent
      ),
  },
  {
    path: 'create-contact',
    loadComponent: () =>
      import('./create-contact/create-contact.component').then(
        (c) => c.CreateContactComponent
      ),
  },
];
