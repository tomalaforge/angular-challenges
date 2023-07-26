import { Routes } from '@angular/router';

export const PARAM_TICKET_ID = 'ticketId';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./list/list.component').then((c) => c.ListComponent),
  },
  {
    path: `detail/:${PARAM_TICKET_ID}`,
    loadComponent: () =>
      import('./detail/detail.component').then((c) => c.DetailComponent),
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];
