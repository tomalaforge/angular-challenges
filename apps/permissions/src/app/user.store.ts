import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Role, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private user = new BehaviorSubject<User | undefined>(undefined);
  user$ = this.user.asObservable();

  isUserLoggedIn$ = this.user$.pipe(map(Boolean));
  isAdmin$ = this.user$.pipe(map((user) => user?.isAdmin));

  hasAnyRole = (role: Role | Role[]) =>
    this.user$.pipe(
      map((user) => {
        if (user?.isAdmin) return true;

        const roles: Role[] = Array.isArray(role) ? role : [role];
        return roles.length === 0 || user?.roles.some((r) => roles.includes(r));
      })
    );

  add(user: User) {
    this.user.next(user);
  }
}
