import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { Person } from './person.model';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [ScrollingModule],
  template: `
    <cdk-virtual-scroll-viewport
      appendOnly
      itemSize="36"
      class="h-[300px] border-2 border-black">
      <div
        *cdkVirtualFor="let person of persons"
        class="flex justify-between items-center border-b h-9">
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
  @Input() persons: Person[] = [];
}
