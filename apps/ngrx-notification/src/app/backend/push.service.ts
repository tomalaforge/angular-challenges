import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, timer } from 'rxjs';
import { randStudent } from '../model/student.model';
import { randTeacher } from '../model/teacher.model';

@Injectable({ providedIn: 'root' })
export class PushService {
  private notificationSubject = new BehaviorSubject<any>(undefined);
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
