import { Component, input, output } from '@angular/core';
import { Person } from './person.model';

@Component({
  selector: 'app-person-list',
  template: `
    @for (person of persons(); track person.email) {
      <div class="flex items-center justify-between border-b">
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
    }
  `,
  host: {
    class: 'w-full flex flex-col',
  },
})
export class PersonListComponent {
  persons = input<Person[]>();
  delete = output<string>();
  update = output<string>();
}
