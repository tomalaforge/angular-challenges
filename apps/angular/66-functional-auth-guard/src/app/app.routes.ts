import { Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard] },
];
