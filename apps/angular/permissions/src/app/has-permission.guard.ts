import { inject } from '@angular/core';
import { CanMatchFn, Route, Router } from '@angular/router';
import { UserStore } from './user.store';
import { Role } from './user.model';

const CanMatchRole: CanMatchFn = (route: Route) => {
  const store = inject(UserStore);
  const router = inject(Router);

  const accessRolesList: Role[] = route.data?.['roles'] ?? [];
  const isAdmin: boolean = route.data?.['isAdmin'] ?? false;

  const user = store.user();

  if (!user) {
    return router.parseUrl('no-user');
  }

  if (isAdmin) {
    return store.isAdmin();
  } else if (accessRolesList.length > 0) {
    return store.hasAnyRole(accessRolesList);
  }

  return false;
};

export default CanMatchRole;
