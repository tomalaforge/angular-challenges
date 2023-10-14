import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'foo',
    loadComponent: () => import('./foo.component').then((c) => c.FooComponent),
  },
  { path: '**', redirectTo: 'home' },
];
