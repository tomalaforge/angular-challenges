/* eslint-disable @angular-eslint/component-selector */
import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { StudentStore } from './data-access/student.store';

@Component({
  standalone: true,
  imports: [NgFor, AsyncPipe],
  selector: 'student',
  template: `
    <h3>STUDENTS</h3>
    <div *ngFor="let student of students$ | async">
      {{ student.firstname }}
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
  students$ = this.studentStore.students$;

  constructor(private studentStore: StudentStore) {}
}
