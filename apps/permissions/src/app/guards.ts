import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Role } from './user.model';
import { UserStore } from './user.store';

export const isAdmin = () => {
  const userStore = inject(UserStore);
  const router = inject(Router);
  return userStore.isAdmin$.pipe(
    map((isAdmin) => {
      return isAdmin ? true : router.createUrlTree(['/access-denied']);
    })
  );
};

export const hasPermissions = (
  roles: Role[],
  userStore = inject(UserStore)
) => {
  const router = inject(Router);
  return userStore.hasAnyRole(roles).pipe(
    map((hasRole) => {
      return hasRole ? true : router.createUrlTree(['/access-denied']);
    })
  );
};
