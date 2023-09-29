import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Role, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  readonly #user = new BehaviorSubject<User | undefined>(undefined);
  readonly user$ = this.#user.asObservable();
  readonly isAdmin$ = this.user$.pipe(map((user) => user?.isAdmin));

  hasAnyRole(role: Role | Role[]) {
    return this.user$.pipe(
      map((user: User | undefined) => {
        const roles = role instanceof Array ? role : [role];
        return roles.some((role) => user?.roles.includes(role));
      })
    );
  }

  add(user: User) {
    this.#user.next(user);
  }
}
