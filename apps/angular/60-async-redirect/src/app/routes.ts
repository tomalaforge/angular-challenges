import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AdminPage } from './admin-page';
import { App } from './app';
import { Dashboard } from './dashboard';
import { ProfilePage } from './profile-page';
import { UserPage } from './user-page';
import { UserProfileService } from './user-profile.service';

export const routes: Routes = [
  {
    path: '',
    component: App,
    children: [
      { path: '', pathMatch: 'full', component: Dashboard },
      { path: 'profile', component: ProfilePage },
      {
        path: 'account',
        pathMatch: 'full',
        redirectTo: () => inject(UserProfileService).getProfile(),
      },
      { path: 'admin', component: AdminPage },
      { path: 'user', component: UserPage },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
