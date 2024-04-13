import { AuthorizationService } from '@angular-challenges/module-to-standalone/core/service';
import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';

export const IsAuthorizedGuard: CanMatchFn = () => {
  // this is rxjs observable solution
  return inject(AuthorizationService).isAuthorized$;

  // this is signal solution
  // return inject(AuthorizationService).isAuthorized()
};
