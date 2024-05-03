import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.ContactDashboardModule,
      ),
  },
  {
    path: 'create-contact',
    loadChildren: () =>
      import('./create-contact/create-contact.component').then(
        (m) => m.CreateContactModule,
      ),
  },
];
