import {
  Push,
  randStudent,
  randTeacher,
} from '@angular-challenges/ngrx-notification/model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PushService {
  private notificationSubject = new BehaviorSubject<Push | undefined>(
    undefined
  );
  notification$ = this.notificationSubject.asObservable();

  init() {
    this.startTeacherNotification();
    this.startStudentNotification();
  }

  private startTeacherNotification() {
    timer(0, 4000)
      .pipe(tap(() => this.notificationSubject.next(randTeacher())))
      .subscribe();
  }

  private startStudentNotification() {
    timer(1000, 3000)
      .pipe(tap(() => this.notificationSubject.next(randStudent())))
      .subscribe();
  }
}
