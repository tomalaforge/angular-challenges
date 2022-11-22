import { Injectable } from '@angular/core';
import { filter } from 'rxjs';
import { PushService } from '../backend/push.service';
import { Push } from '../model/push.model';
import { isStudent } from '../model/student.model';
import { isTeacher } from '../model/teacher.model';
import { StudentStore } from './student.store';
import { TeacherStore } from './teacher.store';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(
    private pushService: PushService,
    private teacherStore: TeacherStore,
    private studentStore: StudentStore
  ) {}

  init() {
    this.pushService.notification$
      .pipe(filter(Boolean))
      .subscribe((notification: Push) => {
        console.log(notification);
        if (isTeacher(notification)) {
          this.teacherStore.addOne(notification);
        }
        if (isStudent(notification)) {
          this.studentStore.addOne(notification);
        }
      });
  }
}
