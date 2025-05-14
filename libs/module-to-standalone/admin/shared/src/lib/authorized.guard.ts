import { CanMatchFn, Router } from '@angular/router';

import { AuthorizationService } from '@angular-challenges/module-to-standalone/core/service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const IsAuthorizedGuard: CanMatchFn = () => {
  const authorizationService = inject(AuthorizationService);
  const router = inject(Router);

  return authorizationService.isAuthorized$.pipe(
    map((isAuthorized) =>
      isAuthorized ? true : router.createUrlTree(['forbidden']),
    ),
  );
};
