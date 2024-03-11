import { IsAuthorizedGuard } from '@angular-challenges/module-to-standalone/admin/shared';
import { Route, mapToCanActivate } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('@angular-challenges/module-to-standalone/home').then(
        (m) => m.HomeComponent,
      ),
  },
  {
    path: 'admin',
    canActivate: mapToCanActivate([IsAuthorizedGuard]),
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/admin/feature').then(
        (m) => m.adminRoutes,
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/user/shell').then(
        (m) => m.userShellRoutes,
      ),
  },

  {
    path: 'forbidden',
    loadComponent: () =>
      import('@angular-challenges/module-to-standalone/forbidden').then(
        (m) => m.ForbiddenComponent,
      ),
  },
];
