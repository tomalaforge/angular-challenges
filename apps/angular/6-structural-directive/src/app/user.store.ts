import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User ,Role, everyone} from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private user = new BehaviorSubject<User|undefined>(undefined);
  user$ = this.user.asObservable();

  add(user: User) {
    this.user.next(user);
  }

  hasRole(role: string | string[] | undefined) {
    console.log(this.user)
    return this.user.pipe(
      map((user) => {
        if (role?.length === 0) return false;
        const userRoles = user?.roles;
        if (!userRoles || userRoles?.length === 0) {
          return false;
        }
        if(userRoles.includes('ADMIN')){
          return true;
        }
        if (Array.isArray(role)) {
          return userRoles.some((userRole) => role.includes(userRole));
        }
        if (typeof role === 'string') {
          return userRoles.some((userRole) => role === userRole);
        }
        return false;
      })
    );
  }
}
