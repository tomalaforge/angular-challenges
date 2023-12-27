import { provideToken } from '@angular-challenges/module-to-standalone/core/providers';
import { Route } from '@angular/router';
import { UserShellComponent } from './user-shell.component';

export const routes: Route[] = [
  {
    path: '',
    providers: [provideToken('user-token')],
    component: UserShellComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('@angular-challenges/module-to-standalone/user/home').then(
            (_) => _.UserHomeComponent,
          ),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('@angular-challenges/module-to-standalone/user/contact').then(
            (_) => _.routes,
          ),
      },
    ],
  },
];
