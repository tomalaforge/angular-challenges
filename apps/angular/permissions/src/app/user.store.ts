import { Injectable, computed, signal } from '@angular/core';
import { Role, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private readonly user = signal<User | undefined>(undefined);

  readonly isUserLoggedIn = computed<boolean>(() => !!this.user());
  readonly isAdmin = computed<boolean>(() => !!this.user()?.isAdmin);

  hasAnyRole(roles: Role[]): boolean {
    const user = this.user();
    return user?.isAdmin
      ? true
      : user?.roles.some((r) => roles.includes(r)) ?? false;
  }

  select(user: User): void {
    this.user.set(user);
  }
}
