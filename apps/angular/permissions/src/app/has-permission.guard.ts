import { inject } from '@angular/core';
import { CanMatchFn, Route, Router } from '@angular/router';
import { UserStore } from './user.store';
import { mergeMap, of } from 'rxjs';
import { Role } from './user.model';

const CanMatchRole: CanMatchFn = (route: Route) => {
  const store = inject(UserStore);
  const router = inject(Router);

  const accessRolesList: Role[] = route.data?.['roles'] ?? [];
  const isAdmin: boolean = route.data?.['isAdmin'] ?? false;

  return store.isLoggedIn$.pipe(
    mergeMap((user) => {
      if (!user) {
        return of(router.parseUrl('no-user'));
      }

      if (isAdmin) {
        return store.isAdmin$;
      } else if (accessRolesList.length > 0) {
        return store.hasAnyRole(accessRolesList);
      }
      return of(false);
    }),
  );
};

export default CanMatchRole;
