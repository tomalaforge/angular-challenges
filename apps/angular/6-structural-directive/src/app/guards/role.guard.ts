import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { map } from 'rxjs';
import { Role } from '../user.model';
import { UserStore } from '../user.store';

export function hasRole(roles: Role[]): CanMatchFn {
  return () => {
    const userStore = inject(UserStore);

    return userStore.user$.pipe(
      map((user) => {
        if (!user) return false;
        if (user.isAdmin) return true;
        return roles.some((role) => user.roles.includes(role));
      }),
    );
  };
}
