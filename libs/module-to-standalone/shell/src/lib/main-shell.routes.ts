import { IsAuthorizedGuard } from '@angular-challenges/module-to-standalone/admin/shared';
import { provideToken } from '@angular-challenges/module-to-standalone/core/providers';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    providers: [provideToken('main-shell-token')],
    loadComponent: () =>
      import('@angular-challenges/module-to-standalone/home').then(
        (_) => _.HomeComponent,
      ),
  },
  {
    path: 'admin',
    canActivate: [IsAuthorizedGuard],
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/admin/feature').then(
        (_) => _.routes,
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/user/shell').then(
        (_) => _.routes,
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
