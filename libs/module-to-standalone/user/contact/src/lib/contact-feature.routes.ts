import { Route } from '@angular/router';

const contactFeatureRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component'),
  },
  {
    path: 'create-contact',
    loadComponent: () => import('./create-contact/create-contact.component'),
  },
];

export default contactFeatureRoutes;
