import { Routes } from '@angular/router';

export const contactFeatureRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./lib/dashboard/dashboard.component').then(
        (m) => m.ContactDashboardComponent,
      ),
  },
  {
    path: 'create-contact',
    loadComponent: () =>
      import('./lib/create-contact/create-contact.component').then(
        (m) => m.CreateContactComponent,
      ),
  },
];
