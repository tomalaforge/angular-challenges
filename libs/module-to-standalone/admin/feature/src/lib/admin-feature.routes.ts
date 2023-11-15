import { Route } from '@angular/router';

export const adminRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
  },
  {
    path: 'create-user',
    loadChildren: () =>
      import('./create-user/create-user.routes').then(
        (m) => m.createUserRoutes
      ),
  },
];
