import { Push } from '@angular-challenges/ngrx-notification/model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PushService {
  private notificationSubject = new BehaviorSubject<Push | undefined>(
    undefined,
  );
  notification$ = this.notificationSubject.asObservable();

  pushData(data: Push) {
    this.notificationSubject.next(data);
  }
}
