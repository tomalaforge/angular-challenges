import { HomeComponent } from './../../../../../apps/anchor-scrolling/src/app/home.component';
import { IsAuthorizedGuard } from '@angular-challenges/module-to-standalone/admin/shared';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('@angular-challenges/module-to-standalone/home').then(
        (mod) => mod.HomeComponent
      ),
  },
  {
    path: 'admin',
    canActivate: [IsAuthorizedGuard],
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/admin/feature').then(
        (mod) => mod.adminRoute
      ),
  },
  // {
  //   path: 'admin',
  //   canActivate: [IsAuthorizedGuard],
  //   loadChildren: () =>
  //     import('@angular-challenges/module-to-standalone/admin/feature').then(
  //       (m) => m.AdminFeatureModule
  //     ),
  // },
  // {
  //   path: 'user',
  //   loadChildren: () =>
  //     import('@angular-challenges/module-to-standalone/user/shell').then(
  //       (m) => m.UserShellModule
  //     ),
  // },

  // {
  //   path: 'forbidden',
  //   loadChildren: () =>
  //     import('@angular-challenges/module-to-standalone/forbidden').then(
  //       (m) => m.ForbiddenModule
  //     ),
  // },
];
