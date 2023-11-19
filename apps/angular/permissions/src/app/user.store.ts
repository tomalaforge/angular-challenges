import { Injectable, computed, signal } from '@angular/core';
import { Role, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private _user = signal<User | undefined>(undefined);
  user = this._user.asReadonly();

  isLoggedIn = computed(() => Boolean(this.user()));
  isAdmin = computed(() => Boolean(this.user()?.isAdmin));

  hasAnyRole = (role: Role | Role[]) => {
    const user = this.user();

    if (!user) {
      return false;
    }

    if (user.isAdmin) {
      return true;
    }

    const roles: Role[] = Array.isArray(role) ? role : [role];
    return roles.length === 0 || user.roles.some((r) => roles.includes(r));
  };

  add(user: User) {
    this._user.set(user);
  }
}
