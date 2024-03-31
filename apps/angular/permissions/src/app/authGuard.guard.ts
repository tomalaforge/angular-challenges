import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { RoleWeight, RolesWeight, User } from './user.model';

export const authGuardGuard: CanActivateFn = (route, state) => {
  //
  // const loggedRoleService = inject(UserStore);
  const loggedUserJSON = localStorage.getItem('loggedUser');
  if (!loggedUserJSON) return true;
  const loggedUser: User = JSON.parse(loggedUserJSON);
  console.log('estoy en el guard', loggedUser, route.routeConfig?.path, state);
  const currentRoute = route.routeConfig?.path;
  const router = inject(Router);
  if (loggedUser?.isAdmin) return true;
  const pathWeight = getRoleWeight(route.routeConfig?.path);
  const loggedUserWeight = getRoleWeight(loggedUser.name);
  if (!loggedUserWeight) return false;
  if (!pathWeight) return false;

  console.log(
    'el peso de loggedUser es',
    loggedUserWeight,
    'y el de la ruta es',
    pathWeight,
  );
  if (
    loggedUserWeight.weight < pathWeight.weight ||
    loggedUser.name === currentRoute
  ) {
    return true;
  } else {
    router.navigateByUrl(`/${loggedUserWeight.route}`);
    return false;
  }
};

function getRoleWeight(role: string | undefined): RoleWeight | undefined {
  return RolesWeight.find((p) => p.name === role);
}
