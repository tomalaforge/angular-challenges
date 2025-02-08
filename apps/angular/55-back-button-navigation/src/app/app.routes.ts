import { Routes } from '@angular/router';
import { DialogGuard } from './dialog/dialog.guard';
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
    canDeactivate: [DialogGuard],
  },
  {
    path: 'sensitive-action',
    component: SensitiveActionComponent,
    canDeactivate: [DialogGuard],
  },
];
