import { Injectable } from '@angular/core';
import { map, timer } from 'rxjs';
import { user, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  fetchUser = () => timer(500).pipe(map(() => user));
  updateUser = (user: User) =>
    timer(1000).pipe(
      map(() => {
        return;
      }),
    );
}
