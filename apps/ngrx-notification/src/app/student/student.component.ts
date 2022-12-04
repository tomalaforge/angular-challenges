/* eslint-disable @angular-eslint/component-selector */
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
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
export class StudentComponent {
  private store = inject(Store);
  students$ = this.store.select(StudentSelectors.selectStudents);
}
