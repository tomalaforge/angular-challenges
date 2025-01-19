import { IsAuthorizedGuard } from '@angular-challenges/module-to-standalone/admin/shared';
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
    canMatch: [IsAuthorizedGuard],
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/admin/feature'),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('@angular-challenges/module-to-standalone/forbidden'),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/user/shell'),
  },
];
