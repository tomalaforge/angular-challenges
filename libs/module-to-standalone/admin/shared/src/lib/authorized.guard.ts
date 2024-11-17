import { AuthorizationService } from '@angular-challenges/module-to-standalone/core/service';
import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

export const isAuthorizedGuard = (): Observable<boolean | UrlTree> => {
  const authorizationService = inject(AuthorizationService);
  const router = inject(Router);

  return authorizationService.isAuthorized$.pipe(
    map((isAuthorized) =>
      isAuthorized ? true : router.createUrlTree(['forbidden']),
    ),
  );
};
