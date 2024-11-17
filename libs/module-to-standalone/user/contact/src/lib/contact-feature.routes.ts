import { Route } from '@angular/router';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { ContactDashboardComponent } from './dashboard/dashboard.component';

export const contactFeatureRoutes: Route[] = [
  {
    path: '',
    component: ContactDashboardComponent,
    children: [
      {
        path: 'create-contact',
        component: CreateContactComponent,
      },
    ],
  },
];
