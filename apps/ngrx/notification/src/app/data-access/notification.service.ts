import { PushService } from '@angular-challenges/ngrx-notification/backend';
import {
  isSchool,
  isStudent,
  isTeacher,
  Push,
} from '@angular-challenges/ngrx-notification/model';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { studentActions } from '../student/store/student.actions';
import { teacherActions } from '../teacher/store/teacher.actions';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private pushService = inject(PushService);
  private store = inject(Store);

  init() {
    this.pushService.notification$
      .pipe(filter(Boolean))
      .subscribe((notification: Push) => {
        if (isTeacher(notification)) {
          this.store.dispatch(
            teacherActions.addOneTeacher({ teacher: notification }),
          );
        }
        if (isStudent(notification)) {
          this.store.dispatch(
            studentActions.addOneStudent({ student: notification }),
          );
        }
        if (isSchool(notification)) {
          // SchoolStore is not providedin root. thus at initialization, SchoolStore is undefined
          // Option 1: set SchoolStore in root, but we don't want this to separate our class.
          // Option 2: your turn
        }
      });
  }
}
