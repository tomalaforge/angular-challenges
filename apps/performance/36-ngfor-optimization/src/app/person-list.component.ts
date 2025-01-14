import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Person } from './person.model';

@Component({
  selector: 'app-person-list',
  imports: [CommonModule],
  template: `
    <div
      *ngFor="let person of persons"
      class="flex items-center justify-between border-b">
      <h3>{{ person.name }}</h3>
      <div class="flex gap-10 py-1">
        <button
          class="rounded-md border bg-blue-500 p-2 text-white"
          (click)="update.emit(person.email)">
          UPDATE
        </button>
        <button
          class="rounded-md border bg-red-500 p-2 text-white"
          (click)="delete.emit(person.email)">
          DELETE
        </button>
      </div>
    </div>
  `,
  host: {
    class: 'w-full flex flex-col',
  },
})
export class PersonListComponent {
  @Input() persons: Person[] = [];
  @Output() delete = new EventEmitter<string>();
  @Output() update = new EventEmitter<string>();
}
