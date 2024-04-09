import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Person } from './person.model';
@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [ScrollingModule],
  template: `
    <div class="relative h-[300px] overflow-hidden">
      <cdk-virtual-scroll-viewport
        itemSize="35"
        class="absolute inset-0 overflow-scroll bg-red-100">
        <div
          *cdkVirtualFor="let person of persons"
          class="flex h-9 items-center justify-between border-b">
          <h3>{{ person.name }}</h3>
          <p>{{ person.email }}</p>
        </div>
      </cdk-virtual-scroll-viewport>
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
