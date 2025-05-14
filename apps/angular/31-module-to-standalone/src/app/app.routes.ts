import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/shell').then(
        (r) => r.appRoutes,
      ),
  },
  { path: '**', redirectTo: '' },
];
