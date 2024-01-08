/* eslint-disable @angular-eslint/component-selector */
import { PushService } from '@angular-challenges/ngrx-notification/backend';
import { Push, isStudent } from '@angular-challenges/ngrx-notification/model';
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { studentActions } from './store/student.actions';
import { StudentSelectors } from './store/student.selectors';

@Component({
  standalone: true,
  imports: [NgFor, AsyncPipe],
  selector: 'student',
  template: `
    <h3>STUDENTS</h3>
    <div *ngFor="let student of students$ | async">
      {{ student.firstname }} {{ student.lastname }} - {{ student.version }}
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
export class StudentComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  students$ = this.store.select(StudentSelectors.selectStudents);

  private pushService = inject(PushService);
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.pushService.notification$
      .pipe(filter(Boolean))
      .subscribe((notification: Push) => {
        if (isStudent(notification)) {
          this.store.dispatch(
            studentActions.addOneStudent({ student: notification }),
          );
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
