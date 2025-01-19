import { AuthorizationService } from '@angular-challenges/module-to-standalone/core/service';
import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';

export const IsAuthorizedGuard: CanMatchFn = () => {
  return inject(AuthorizationService).isAuthorized$;
};
