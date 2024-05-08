import { Injectable, signal } from '@angular/core';
import { Role, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private _user = signal<User | undefined>(undefined);
  user = this._user.asReadonly();

  add(user: User) {
    this._user.set(user);
  }

  matches(matchRoles?: Role[] | Role) {
    const user = this.user();
    if (user?.isAdmin) {
      return true;
    } else if (!matchRoles) {
      return false;
    }
    const userRoles = user?.roles ?? [];
    const roles = Array.isArray(matchRoles) ? matchRoles : [matchRoles];
    return roles.some((role) => userRoles.includes(role));
  }
}
