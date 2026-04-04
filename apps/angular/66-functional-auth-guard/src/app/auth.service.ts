import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = false;
  role: 'user' | 'admin' = 'user';

  login(role: 'user' | 'admin'): void {
    this.isLoggedIn = true;
    this.role = role;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.role = 'user';
  }
}
