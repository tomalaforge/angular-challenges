import { NgForTrackByModule } from '@angular-challenges/shared/directives';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Person } from './person.model';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, NgForTrackByModule, ScrollingModule],
  template: `
    <cdk-virtual-scroll-viewport
      itemSize="20"
      class="example-viewport"
      appendOnly>
      <div
        *cdkVirtualFor="let person of persons"
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
  @Input() persons: Person[] = [];
}
