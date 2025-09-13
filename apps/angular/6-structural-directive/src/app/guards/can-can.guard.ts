import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Role } from '../user.model';
import { UserStore } from '../user.store';

export const canCanGuard: CanActivateFn = (route, state) => {
  const userStore = inject(UserStore);

  const activeUser = userStore.currentUser;
  const routeData = route.data;
  const roles = routeData?.['roles'] as string[] | undefined;

  if (activeUser?.isAdmin && routeData?.['isAdmin']) {
    return true;
  }

  if ([roles ?? []]?.length <= 0) return false;

  const hasRole = roles?.some((roleName) =>
    activeUser?.roles.includes(roleName as Role),
  );
  return !!hasRole;
};
