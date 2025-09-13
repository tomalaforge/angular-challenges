import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStore } from '../user.store';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const userStore = inject(UserStore);
  const router = inject(Router);

  if (userStore.currentUser) return true;
  router.navigate(['/']).then();
  return false;
};
