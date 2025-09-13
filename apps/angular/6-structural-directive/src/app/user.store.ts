import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private readonly user = new BehaviorSubject<User | undefined>(undefined);
  user$ = this.user.asObservable();

  add(user: User | undefined) {
    this.user.next(user);
  }

  get currentUser(): User | undefined {
    return this.user.getValue();
  }
}
