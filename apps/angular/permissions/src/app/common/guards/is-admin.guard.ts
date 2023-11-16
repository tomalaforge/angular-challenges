import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { UserStore } from '../../user.store';
import { map } from 'rxjs';
import { TypedRoute } from '../../routes';

export const HasPermission: CanMatchFn = (route: TypedRoute, segments) => {
  const user$ = inject(UserStore).user$;
  return user$.pipe(
    map((user) => {
      if (route?.data?.isAdmin) return user?.isAdmin ? true : false;
      else {
        const roles = route?.data?.roles || [];
        return roles?.some((role) => user?.roles.includes(role));
      }
    })
  );
};
