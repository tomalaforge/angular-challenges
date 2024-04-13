import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./forbidden.component').then((m) => m.ForbiddenComponent),
  },
];

export default routes;
