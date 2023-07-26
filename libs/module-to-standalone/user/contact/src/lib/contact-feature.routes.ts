import { Route } from '@angular/router';

export const ContactRoute: Route[] = [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component'),
  },
  {
    path: 'create-contact',
    loadComponent: () =>
      import('./create-contact/create-contact.component').then(
        (c) => c.CreateContactComponent
      ),
  },
];
