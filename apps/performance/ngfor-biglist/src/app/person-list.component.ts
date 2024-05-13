import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { Person } from './person.model';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [ScrollingModule],
  template: `
    <cdk-virtual-scroll-viewport
      itemSize="50"
      class="relative h-[300px] overflow-hidden">
      <div
        *cdkVirtualFor="let person of persons(); trackBy: trackByEmail"
        class="flex h-9 items-center justify-between border-b">
        <h3>{{ person.name }}</h3>
        <p>{{ person.email }}</p>
      </div>
    </cdk-virtual-scroll-viewport>
  `,
  host: {
    class: 'w-full flex flex-col',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  readonly persons = input.required<Person[]>();

  trackByEmail(_index: number, person: Person): string {
    return person.email;
  }
}
