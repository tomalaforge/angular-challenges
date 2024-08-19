import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment } from '@angular/router';
import { map } from 'rxjs';
import { UserStore } from '../../user.store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch {
  constructor(
    public router: Router,
    public store: UserStore,
  ) {}

  public canMatch(route: Route, segments: UrlSegment[]) {
    console.log('route ', route.data?.['roles'], segments);

    return this.store.hasRole(route.data?.['roles']).pipe(
      map((permission: boolean) => {
        return permission;
      }),
    );


  }
}
