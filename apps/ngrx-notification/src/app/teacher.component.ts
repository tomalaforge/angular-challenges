import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TeacherStore } from './data-access/teacher.store';

@Component({
  standalone: true,
  imports: [NgFor, AsyncPipe],
  selector: 'teacher',
  template: `
    <h3>TEACHERS</h3>
    <div *ngFor="let teacher of teacher$ | async">
      {{ teacher.firstname }}
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
  teacher$ = this.teacherStore.teachers$;

  constructor(private teacherStore: TeacherStore) {}
}
