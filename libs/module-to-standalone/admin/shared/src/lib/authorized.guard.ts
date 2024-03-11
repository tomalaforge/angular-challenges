import { Router, UrlTree } from '@angular/router';

import { AuthorizationService } from '@angular-challenges/module-to-standalone/core/service';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsAuthorizedGuard {
  authorizationService = inject(AuthorizationService);
  router = inject(Router);

  canActivate(): Observable<boolean | UrlTree> {
    return this.authorizationService.isAuthorized$.pipe(
      map((isAuthorized) =>
        isAuthorized ? true : this.router.createUrlTree(['forbidden']),
      ),
    );
  }
}
