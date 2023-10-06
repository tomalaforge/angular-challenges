import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NgForTrackByModule } from '@angular-challenges/shared/directives';
import { Person } from './person.model';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [NgForTrackByModule],
  template: `
    <div
      *ngFor="let person of persons; trackByProp: 'email'"
      class="flex justify-between items-center border-b">
      <h3>{{ person.name }}</h3>
      <div class="flex gap-10 py-1">
        <button
          class="border rounded-md p-2 bg-blue-500 text-white"
          (click)="update.emit(person.email)">
          UPDATE
        </button>
        <button
          class="border rounded-md p-2 bg-red-500 text-white"
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
