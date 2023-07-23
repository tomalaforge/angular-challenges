import { IsAuthorizedGuard } from '@angular-challenges/module-to-standalone/admin/shared';
import { provideToken } from '@angular-challenges/module-to-standalone/core/providers';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('@angular-challenges/module-to-standalone/home'),
  },
  {
    path: 'admin',
    canActivate: [IsAuthorizedGuard],
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/admin/feature'),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/user/shell'),
    providers: [provideToken('user-token')],
  },

  {
    path: 'forbidden',
    loadComponent: () =>
      import('@angular-challenges/module-to-standalone/forbidden'),
  },
];
