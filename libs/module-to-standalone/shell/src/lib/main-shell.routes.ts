import { Routes } from '@angular/router';

import { IsAuthorizedGuard } from '@angular-challenges/module-to-standalone/admin/shared';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/home').then(
        (_) => _.ROUTES,
      ),
  },
  {
    path: 'admin',
    canActivate: [IsAuthorizedGuard],
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/admin/feature').then(
        (_) => _.ROUTES,
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/user/shell').then(
        (_) => _.userShellRoutes,
      ),
  },
  {
    path: 'forbidden',
    loadComponent: () =>
      import('@angular-challenges/module-to-standalone/forbidden').then(
        (_) => _.ForbiddenComponent,
      ),
  },
];
