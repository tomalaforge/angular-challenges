import { CanActivate, Router, UrlTree } from '@angular/router';

import { AuthorizationService } from '@angular-challenges/module-to-standalone/core/service';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsAuthorizedGuard implements CanActivate {
  private authorizationService = inject(AuthorizationService);
  private router = inject(Router);

  canActivate(): Observable<boolean | UrlTree> {
    return this.authorizationService.isAuthorized$.pipe(
      map((isAuthorized) =>
        isAuthorized ? true : this.router.createUrlTree(['forbidden']),
      ),
    );
  }
}
