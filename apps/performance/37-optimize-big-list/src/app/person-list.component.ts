import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Person } from './person.model';

@Component({
  selector: 'app-person-list',
  template: `
    <div class="relative h-[300px] overflow-hidden">
      <div class="absolute inset-0 overflow-scroll">
        @for (person of persons(); track person.email) {
          <div class="flex h-9 items-center justify-between border-b">
            <h3>{{ person.name }}</h3>
            <p>{{ person.email }}</p>
          </div>
        }
      </div>
    </div>
  `,
  host: {
    class: 'w-full flex flex-col',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  persons = input<Person[]>();
}
