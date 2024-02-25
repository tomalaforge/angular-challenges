import { inject, Injectable } from '@angular/core';
import { CanMatchFn, Route, Router, UrlTree } from '@angular/router';

import { Role } from './user.model';
import { UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class HasPermissionService {
  private readonly router = inject(Router);
  private readonly userStore = inject(UserStore);

  canMatch(route: Route): boolean | UrlTree {
    const isAdmin: boolean = route.data?.['isAdmin'] ?? false;
    const roles: Role[] = route.data?.['roles'] ?? [];
    return this.hasPermission$(isAdmin, roles);
  }

  private hasPermission$(
    isAdmin: boolean,
    accessRolesList: Role[],
  ): boolean | UrlTree {
    const isLoggedIn = this.userStore.isUserLoggedIn();

    if (!isLoggedIn) {
      return this.router.parseUrl('no-user');
    }

    if (accessRolesList.length > 0) {
      return this.userStore.hasAnyRole(accessRolesList);
    }

    if (isAdmin) {
      return this.userStore.isAdmin();
    }

    return false;
  }
}

export const HasPermissionGuard: CanMatchFn = (
  next: Route,
): boolean | UrlTree => {
  return inject(HasPermissionService).canMatch(next);
};
