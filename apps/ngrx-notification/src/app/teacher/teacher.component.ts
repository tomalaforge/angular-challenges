/* eslint-disable @angular-eslint/component-selector */
import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
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
export class TeacherComponent {
  teacher$ = this.store.select(TeacherSelectors.selectTeachers);

  constructor(private store: Store) {}
}
