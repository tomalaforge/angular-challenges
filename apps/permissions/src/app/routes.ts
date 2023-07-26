export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (c) => c.AdminDashboardComponent
      ),
  },
];
