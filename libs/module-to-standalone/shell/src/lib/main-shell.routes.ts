import { Route } from '@angular/router';
import { isAuthorizedGuard } from 'libs/module-to-standalone/admin/shared/src/lib/authorized.guard';

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
    canActivate: [isAuthorizedGuard],
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/admin/feature').then(
        (r) => r.ADMIN_ROUTES,
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/user/shell').then(
        (m) => m.USER_ROUTES,
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
