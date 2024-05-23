import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Person } from './person.model';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  template: `
    <div class="relative h-[300px] overflow-hidden">
      <cdk-virtual-scroll-viewport
        class="h-full"
        itemSize="50"
        minBufferPx="0"
        maxBufferPx="50">
        <div
          *cdkVirtualFor="let person of persons; trackBy: trackByFn"
          class="flex h-[50px] items-center justify-between border-b">
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

  protected trackByFn(_index: number, item: Person) {
    return item.email;
  }
}
