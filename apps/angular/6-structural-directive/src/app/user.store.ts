import { computed, Injectable, signal } from '@angular/core';
import { Role, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  #user = signal<User | undefined>(undefined);

  public readonly user = computed(() => this.#user());
  public readonly isAdmin = computed(() => this.#user()?.isAdmin);

  add(user: User) {
    this.#user.set(user);
  }

  userHasRole(roles: Role | Role[] | undefined) {
    if (this.isAdmin()) return true;

    const userRoles = this.user()?.roles || [];

    return userRoles.some((role) => {
      return roles?.includes(role);
    });
  }
}
