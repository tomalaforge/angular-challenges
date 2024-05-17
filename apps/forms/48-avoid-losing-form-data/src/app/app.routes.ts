import { Route } from '@angular/router';
import { FormDeactivateGuard } from './form-deactive.guard';
import { JoinComponent } from './pages/join.component';
import { PageComponent } from './pages/page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'form',
  },
  {
    path: 'form',
    loadComponent: () => JoinComponent,
    canDeactivate: [FormDeactivateGuard],
  },
  {
    path: 'page-1',
    data: {
      title: 'Page 1',
    },
    loadComponent: () => PageComponent,
  },
  {
    path: 'page-2',
    data: {
      title: 'Page 2',
    },
    loadComponent: () => PageComponent,
  },
];
