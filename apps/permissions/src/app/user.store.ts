import { Injectable, signal } from '@angular/core';
import { Role, User, everyone } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserStore {
  user = signal<User>(everyone);

  add(user: User) {
    this.user.set(user);
  }

  hasAnyRole(user: User, role: Role | Role[] | undefined) {
    if (!role) {
      return false;
    }
    if (user.isAdmin) {
      return true;
    }
    const roles: Role[] = Array.isArray(role) ? role : [role];
    return (
      roles.length === 0 || user.roles.some((r) => roles.indexOf(r) !== -1)
    );
  }
}
