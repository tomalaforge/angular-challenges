import { Route } from '@angular/router';

export const createContactRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./create-contact.component').then(
        (m) => m.CreateContactComponent
      ),
  },
];
