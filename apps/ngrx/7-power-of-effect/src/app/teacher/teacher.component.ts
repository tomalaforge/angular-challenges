/* eslint-disable @angular-eslint/component-selector */
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { TeacherStore } from './teacher.store';

@Component({
  standalone: true,
  imports: [NgFor, AsyncPipe],
  providers: [provideComponentStore(TeacherStore)],
  selector: 'teacher',
  template: `
    <h3>TEACHERS</h3>
    @for (teacher of teachers$ | async; track $index) {
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
  #store = inject(TeacherStore);
  teachers$ = this.#store.teachers$;
}
