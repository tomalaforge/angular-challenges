import { Route } from '@angular/router';
import { UserShellComponent } from './user-shell.component';

const userShellRoutes: Route[] = [
  {
    path: '',
    component: UserShellComponent,
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
