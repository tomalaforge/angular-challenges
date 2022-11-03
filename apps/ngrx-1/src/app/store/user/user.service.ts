import { Injectable } from '@angular/core';
import { map, timer } from 'rxjs';
import { user } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  fetchUser = () => timer(500).pipe(map(() => user));
}
