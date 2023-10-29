import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of } from 'rxjs';
import { Role, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private user = new BehaviorSubject<User | undefined>(undefined);
  user$ = this.user.asObservable();

  private admin = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.admin.asObservable();

  add(user: User) {
    this.user.next(user);
    this.admin.next(user.isAdmin);
  }

  hasAnyRole(roles: Role | Role[]) {
    return this.user$.pipe(
      map(
        (response) =>
          response?.roles.some((item) => roles.includes(item)) ||
          response?.isAdmin
      )
    );
  }
}
