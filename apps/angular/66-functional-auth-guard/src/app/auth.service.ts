import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _isLoggedIn = signal(false);
  private readonly _role = signal<'user' | 'admin'>('user');

  readonly isLoggedIn = this._isLoggedIn.asReadonly();
  readonly role = this._role.asReadonly();
  readonly isAdmin = computed(() => this._isLoggedIn() && this._role() === 'admin');

  login(role: 'user' | 'admin'): void {
    this._isLoggedIn.set(true);
    this._role.set(role);
  }

  logout(): void {
    this._isLoggedIn.set(false);
    this._role.set('user');
  }
}
