import {
  isStudent,
  isTeacher,
  Push,
} from '@angular-challenges/ngrx-notification/model';
import { inject, Injectable } from '@angular/core';
import { PUSH_ACTION } from './notification.token';
import { StudentStore } from './student.store';
import { TeacherStore } from './teacher.store';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notification$ = inject(PUSH_ACTION);
  private teacherStore = inject(TeacherStore);
  private studentStore = inject(StudentStore);

  init() {
    this.notification$.subscribe((notification: Push) => {
      if (isTeacher(notification)) {
        this.teacherStore.addOne(notification);
      }
      if (isStudent(notification)) {
        this.studentStore.addOne(notification);
      }
    });
  }
}
