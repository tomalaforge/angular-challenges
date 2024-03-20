import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { UserStore } from './user.store';

export const authGuardGuard: CanActivateFn = (route, state) => {
  //

  const loggedRoleService = inject(UserStore);
  const loggedUser = loggedRoleService.loggedUser();
  const currentRoute = route.routeConfig?.path;
  const router = inject(Router);
  if (loggedUser?.isAdmin) return true;
  console.log('estoy en el guard', loggedUser, route.routeConfig?.path);

  if (loggedUser?.name === 'manager' && currentRoute === 'enter') {
    router.navigateByUrl('/manager');
    return true;
  }

  if (loggedUser?.name === 'reader' && currentRoute === 'enter') {
    if (loggedUser.roles.includes('WRITER'))
      router.navigateByUrl('/readerandwriter');
    else router.navigateByUrl('/reader');
    return true;
  }

  if (loggedUser?.name === 'writer' && currentRoute === 'enter') {
    router.navigateByUrl('/writer');
    return true;
  }

  if (loggedUser?.name === 'readerandwriter' && currentRoute === 'enter') {
    router.navigateByUrl('/readerandwriter');
    return true;
  }

  if (loggedUser?.name === 'client' && currentRoute === 'enter') {
    if (loggedUser.roles.length == 0) router.navigateByUrl('/everyone');
    else router.navigateByUrl('/client');
    return true;
  }

  return true;
};
