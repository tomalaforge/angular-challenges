import { Route } from '@angular/router';
import { UserShellComponent } from './user-shell.component';

export const userShellRoutes: Route[] = [
  {
    path: '',
    component: UserShellComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () =>
          import('@angular-challenges/module-to-standalone/user/home').then(
            (m) => m.UserHomeModule,
          ),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('@angular-challenges/module-to-standalone/user/contact').then(
            (m) => m.ContactFeatureModule,
          ),
      },
    ],
  },
];
