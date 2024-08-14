import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { Role, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  #user: WritableSignal<User | undefined> = signal(undefined);
  user$ = computed(() => this.#user());

  add(user: User) {
    this.#user.set(user);
  }

  hasRoles(inputRoles: Role | Role[] | undefined) {
    if (!!inputRoles && inputRoles?.length > 0) {
      const roles = inputRoles instanceof Array ? inputRoles : [inputRoles];
      return roles.some((role) => this.user$()?.roles.includes(role));
    } else {
      return this.user$()?.isAdmin;
    }
  }
}
