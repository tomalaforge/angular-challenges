import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { NgForTrackByModule } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { Person } from './person.model';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, NgForTrackByModule],
  template: `
    <div class="relative h-[300px] overflow-hidden">
      <div class="absolute inset-0 overflow-scroll">
        <div
          *ngFor="let person of persons; trackByProp: 'email'"
          class="flex h-9 items-center justify-between border-b">
          <h3>{{ person.name }}</h3>
          <p>{{ person.email }}</p>
        </div>
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
}
