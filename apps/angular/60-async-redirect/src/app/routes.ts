import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs';
import { AdminPage } from './admin-page';
import { App } from './app';
import { Dashboard } from './dashboard';
import { ProfilePage } from './profile-page';
import { UserPage } from './user-page';
import { UserProfileService } from './user-profile.service';

const redirectTo = () => {
  const router = inject(Router);

  return inject(UserProfileService)
    .getProfile()
    .pipe(
      distinctUntilChanged(),
      map((profile) =>
        profile === 'admin'
          ? router.createUrlTree(['/admin'])
          : router.createUrlTree(['/user']),
      ),
    );
};

export const routes: Routes = [
  {
    path: '',
    component: App,
    children: [
      { path: '', pathMatch: 'full', component: Dashboard },
      { path: 'profile', component: ProfilePage },
      {
        path: 'navigateTo',
        redirectTo,
      },
      { path: 'admin', component: AdminPage },
      { path: 'user', component: UserPage },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
