/* eslint-disable @angular-eslint/component-selector */
import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { teacherFeature } from './store/teacher.reducer';

@Component({
  standalone: true,
  imports: [NgFor],
  selector: 'teacher',
  template: `
    <h3>TEACHERS</h3>
    @for (teacher of teacher(); track teacher.id) {
      <div>
        {{ teacher.firstname }} {{ teacher.lastname }} - {{ teacher.version }}
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
export class TeacherComponent {
  teacher = inject(Store).selectSignal(teacherFeature.selectTeachers);
}
