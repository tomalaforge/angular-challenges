import { computed, Injectable, signal } from '@angular/core';
import { Role, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private _user = signal<User | undefined>(undefined);
  readonly user = this._user.asReadonly();

  add(user: User) {
    this._user.set(user);
  }

  isAdmin = computed(() => !!this.user()?.isAdmin);

  hasAnyRole = (role: Role | Role[]) => {
    return computed(() => {
      const user = this.user();
      if (user?.isAdmin) return true;
      const roles: Role[] = Array.isArray(role) ? role : [role];
      return roles.length === 0 || user?.roles.some((r) => roles.includes(r));
    });
  };
}
