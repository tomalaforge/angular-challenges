import { Routes } from '@angular/router';

export const userHomeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home.component').then((m) => m.UserHomeComponent),
  },
];
