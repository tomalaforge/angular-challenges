import { Injectable, signal } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private _user = signal<User | undefined>(undefined);
  user = this._user.asReadonly();

  add(user: User) {
    this._user.set(user);
  }
}
