import { Routes } from '@angular/router';
import { canDeactivateGuard } from './can-deactivate.guard';
import { HomeComponent } from './home/home.component';
import { SensitiveActionComponent } from './sensitive-action/sensitive-action.component';
import { SimpleActionComponent } from './simple-action/simple-action.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'simple-action',
    component: SimpleActionComponent,
    canDeactivate: [canDeactivateGuard],
  },
  {
    path: 'sensitive-action',
    component: SensitiveActionComponent,
    canDeactivate: [canDeactivateGuard],
  },
];
