import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { NgForTrackByModule } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { Person } from './person.model';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, NgForTrackByModule, ScrollingModule],
  template: `
    <cdk-virtual-scroll-viewport
      style="height: 300px"
      itemSize="20"
      minBufferPx="100"
      maxBufferPx="100"
      class="example-viewport">
      <div
        *cdkVirtualFor="let person of persons; trackBy: trackPerson"
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

  trackPerson(index: number, person: Person) {
    return person ? person.email : undefined;
  }
}
