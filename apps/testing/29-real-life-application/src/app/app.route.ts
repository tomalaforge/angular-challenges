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
      import('./list/list.component').then((m) => m.ListComponent),
  },
  {
    path: `detail/:${PARAM_TICKET_ID}`,
    loadComponent: () =>
      import('./detail/detail.component').then((m) => m.DetailComponent),
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];
