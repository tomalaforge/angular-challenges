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

  /*
  // this is running continually
  // new students, teachers, schools are being added & updated
  // even when you are not on that page

  // app.config.ts 
  starts the notification service

  // this is basically an injection token
    {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: () => {
            const service = inject(NotificationService);
            return () => service.init();
        },
    },

  // Basic solution to add notifications for the existing app
  // create a global effect for a notification 
  // create effects in the individual effects files
  // When the addOne action takes place, call the notification effect
  // Rewrite the school store to not use component store
  */

  init() {
    this.pushService.notification$
      .pipe(filter(Boolean))
      .subscribe((notification: Push) => {
        if (isTeacher(notification)) {
          console.log('teacher');
          this.store.dispatch(
            teacherActions.addOneTeacher({ teacher: notification }),
          );
        }
        if (isStudent(notification)) {
          console.log('student');
          this.store.dispatch(
            studentActions.addOneStudent({ student: notification }),
          );
        }
        if (isSchool(notification)) {
          // SchoolStore is not provided in root. thus at initialization, SchoolStore is undefined
          // Option 1: set SchoolStore in root, but we don't want this to separate our class.
          // Option 2: your turn
          // schools are still being populated without a store dispatch ?
          // no, that is the loadSchools result
          // ngrxOnStoreInit is used in the school store to add schools
        }
      });
  }
}
