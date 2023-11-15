import { Route } from '@angular/router';

export const createUserRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./create-user.component').then((m) => m.CreateUserComponent),
  },
];