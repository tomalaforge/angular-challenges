import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

import { Observable, of } from 'rxjs';
import { Role } from './user.model';
import { UserStore } from './user.store';

export const isAdmin = (): boolean | Observable<UrlTree> => {
  const store = inject(UserStore);
  const router = inject(Router);
  return store.isUserLoggedIn()
    ? store.isAdmin()
    : of(router.parseUrl('no-user'));
};

export const hasRole = (
  accessRolesList: Role[],
): boolean | Observable<UrlTree> => {
  const store = inject(UserStore);
  const router = inject(Router);
  return store.isUserLoggedIn()
    ? store.hasAnyRole(accessRolesList)
    : of(router.parseUrl('no-user'));
};
