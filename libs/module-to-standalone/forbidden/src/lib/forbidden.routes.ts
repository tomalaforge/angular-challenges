import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./forbidden.component').then((c) => c.ForbiddenComponent),
  },
];

export default routes;
