import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Role, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private _user = new BehaviorSubject<User | undefined>(undefined);
  readonly user$ = this._user.asObservable();
  readonly isAdminA$ = this.user$.pipe(map((value) => value?.isAdmin));
  readonly isUserLoggedIn$ = this.user$.pipe(map(Boolean));

  public hasAnyRole(role: Role | Role[]) {
    return this.user$.pipe(
      map((user: User | undefined) => {
        const roles = role instanceof Array ? role : [role];
        return roles.some((role) => user?.roles.includes(role));
      }),
    );
  }

  public add(user: User) {
    this._user.next(user);
  }
}
