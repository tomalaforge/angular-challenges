import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./lib/dashboard/dashboard.component').then(
        (c) => c.ContactDashboardComponent,
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

export default routes;
