import { CanActivate, Router, UrlTree } from '@angular/router';

import { AuthorizationService } from '@angular-challenges/module-to-standalone/core/service';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsAuthorizedGuard implements CanActivate {
  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authorizationService.isAuthorized$.pipe(
      map((isAuthorized) =>
        isAuthorized ? true : this.router.createUrlTree(['forbidden']),
      ),
    );
  }
}
