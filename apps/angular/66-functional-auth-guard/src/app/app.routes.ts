import { Routes } from '@angular/router';
import { adminGuard } from './admin.guard';
import { AdminComponent } from './admin.component';
import { authGuard } from './auth.guard';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard, adminGuard] },
];
