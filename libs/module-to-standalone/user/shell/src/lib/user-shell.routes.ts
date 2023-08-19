import { provideToken } from '@angular-challenges/module-to-standalone/core/providers';
import { Route } from '@angular/router';

const userShellRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./user-shell.component').then((c) => c.UserShellComponent),
    providers: [provideToken('user-token')],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('@angular-challenges/module-to-standalone/user/home'),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('@angular-challenges/module-to-standalone/user/contact'),
      },
    ],
  },
];

export default userShellRoutes;
