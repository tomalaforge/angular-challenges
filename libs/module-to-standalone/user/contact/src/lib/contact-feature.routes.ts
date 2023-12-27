export const routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (_) => _.ContactDashboardComponent,
      ),
  },
  {
    path: 'create-contact',
    loadComponent: () =>
      import('./create-contact/create-contact.component').then(
        (_) => _.CreateContactComponent,
      ),
  },
];
