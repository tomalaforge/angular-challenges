import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
  private isAuthorized = new BehaviorSubject<boolean>(true);
  isAuthorized$ = this.isAuthorized.asObservable();

  authorize() {
    this.isAuthorized.next(true);
  }

  forbid() {
    this.isAuthorized.next(false);
  }
}
