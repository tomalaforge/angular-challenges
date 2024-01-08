/* eslint-disable @angular-eslint/component-selector */
import { PushService } from '@angular-challenges/ngrx-notification/backend';
import { Push, isTeacher } from '@angular-challenges/ngrx-notification/model';
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { teacherActions } from './store/teacher.actions';
import { TeacherSelectors } from './store/teacher.selectors';

@Component({
  standalone: true,
  imports: [NgFor, AsyncPipe],
  selector: 'teacher',
  template: `
    <h3>TEACHERS</h3>
    <div *ngFor="let teacher of teacher$ | async">
      {{ teacher.firstname }} {{ teacher.lastname }} - {{ teacher.version }}
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: fit-content;
        height: fit-content;
        border: 1px solid red;
        padding: 4px;
      }
    `,
  ],
})
export class TeacherComponent implements OnInit, OnDestroy {
  private store = inject(Store);

  teacher$ = this.store.select(TeacherSelectors.selectTeachers);

  private pushService = inject(PushService);
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.pushService.notification$
      .pipe(filter(Boolean))
      .subscribe((notification: Push) => {
        if (isTeacher(notification)) {
          this.store.dispatch(
            teacherActions.addOneTeacher({ teacher: notification }),
          );
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
