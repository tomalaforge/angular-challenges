import { Route } from '@angular/router';

export const CONTACT_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (c) => c.ContactDashboardComponent,
      ),
  },
  {
    path: 'create-contact',
    loadComponent: () =>
      import('./create-contact/create-contact.component').then(
        (c) => c.CreateContactComponent,
      ),
  },
];

export default CONTACT_ROUTES;
