/* eslint-disable @angular-eslint/component-selector */
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { SchoolStore } from './school.store';

@Component({
  standalone: true,
  imports: [NgFor, AsyncPipe],
  providers: [provideComponentStore(SchoolStore)],
  selector: 'school',
  template: `
    <h3>SCHOOL</h3>
    <div *ngFor="let school of school$ | async">
      {{ school.name }} - {{ school.version }}
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
export class SchoolComponent {
  private store = inject(SchoolStore);
  school$ = this.store.schools$;
}
