import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { signal } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
  // this is rxjs observable solution
  private isAuthorized = new BehaviorSubject<boolean>(true);
  isAuthorized$ = this.isAuthorized.asObservable();

  // this is signal solution
  //isAuthorized = signal<boolean>(true)

  authorize() {
    this.isAuthorized.next(true);

    // this is signal solution
    // this.isAuthorized.set(true)
  }

  forbid() {
    this.isAuthorized.next(false);

    // this is signal solution
    // this.isAuthorized.set(false);
  }
}
