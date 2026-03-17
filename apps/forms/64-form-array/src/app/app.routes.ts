import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
  },
  {
    path: 'registration-form-with-form-value-control',
    loadComponent: () =>
      import(
        './registration-form-with-form-value-control/registration-form-with-form-value-control.component'
      ),
  },
  {
    path: 'simple-registration-form',
    loadComponent: () =>
      import('./simple-registration-form/simple-registration-form.component'),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
