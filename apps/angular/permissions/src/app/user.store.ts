import { computed, Injectable, signal } from '@angular/core';
import { Role, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private _user = signal<User | undefined>(undefined);
  user = this._user.asReadonly();

  isAdmin = computed(() => !!this.user()?.isAdmin);

  add(user: User) {
    this._user.set(user);
  }

  matches(matchRoles: Role[] | Role) {
    if (this.isAdmin()) {
      return true;
    }
    return this.matchesRole(
      Array.isArray(matchRoles) ? matchRoles : [matchRoles],
    );
  }

  matchesRole(roles: Role[]) {
    const user = this.user();
    const userRoles = user?.roles ?? [];
    return roles.some((role) => userRoles.includes(role));
  }
}
