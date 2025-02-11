import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Person } from './person.model';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngFor="let person of persons; trackBy: trackByEmail"
      class="flex items-center justify-between border-b">
      <h3>{{ person.name }}</h3>
      <div class="flex gap-10 py-1">
        <button
          class="rounded-md border bg-blue-500 p-2 text-white
                 transition-colors hover:bg-blue-600 focus:outline-none
                 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          (click)="update.emit(person.email)">
          UPDATE
        </button>
        <button
          class="rounded-md border bg-red-500 p-2 text-white
                 transition-colors hover:bg-red-600 focus:outline-none
                 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          (click)="delete.emit(person.email)">
          DELETE
        </button>
      </div>
    </div>
  `,
  host: {
    class: 'w-full flex flex-col',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  @Input() persons: Person[] = [];
  @Output() delete = new EventEmitter<string>();
  @Output() update = new EventEmitter<string>();

  trackByEmail(_: number, person: Person): string {
    return person.email;
  }
}
