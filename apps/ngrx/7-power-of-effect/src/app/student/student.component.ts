/* eslint-disable @angular-eslint/component-selector */
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { studentFeature } from './store/student.reducer';

@Component({
  standalone: true,
  imports: [],
  selector: 'student',
  template: `
    <h3>STUDENTS</h3>
    @for (student of students(); track student.id) {
      <div>
        {{ student.firstname }} {{ student.lastname }} - {{ student.version }}
      </div>
    }
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
  students = inject(Store).selectSignal(studentFeature.selectStudents);
}
