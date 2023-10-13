import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { NgForTrackByModule } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { Person } from './person.model';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, ScrollingModule, NgForTrackByModule],
  template: `
    <cdk-virtual-scroll-viewport itemSize="1" class="h-[300px]">
      <div
        *cdkVirtualFor="let person of persons; trackByProp: 'email'"
        class="flex justify-between items-center border-b h-9">
        <h3>{{ person.name }}</h3>
        <p>{{ person.email }}</p>
      </div>
    </cdk-virtual-scroll-viewport>
  `,
  host: {
    class: 'w-full flex flex-col ',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  @Input() persons: Person[] = [];
}
