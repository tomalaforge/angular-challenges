import { CanMatchFn } from '@angular/router';

import { AuthorizationService } from '@angular-challenges/module-to-standalone/core/service';

import { inject } from '@angular/core';

export const IsAuthorizedGuard: CanMatchFn = () => {
  return inject(AuthorizationService).isAuthorized$;
};
