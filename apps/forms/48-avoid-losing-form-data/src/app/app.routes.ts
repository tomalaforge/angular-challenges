import { Route } from '@angular/router';
import { formGuard } from './guards/form.guard';
import { PageComponent } from './pages/page.component';
import { FormComponent } from './ui/form.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'form',
  },
  {
    path: 'form',
    component: FormComponent,
    canDeactivate: [formGuard],
  },
  {
    path: 'page-1',
    data: {
      title: 'Page 1',
    },
    component: PageComponent,
  },
  {
    path: 'page-2',
    data: {
      title: 'Page 2',
    },
    component: PageComponent,
  },
];
