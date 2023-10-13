import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgForTrackByModule } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { Person } from './person.model';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, NgForTrackByModule, ScrollingModule],
  template: `
    <cdk-virtual-scroll-viewport itemSize="40" style="height: 300px;">
      <div>
        <div
          *cdkVirtualFor="let person of persons; trackBy: trackByEmail"
          class="flex justify-between items-center border-b h-9">
          <h3>{{ person.name }}</h3>
          <p>{{ person.email }}</p>
        </div>
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
  trackByEmail(index: number, item: Person): string {
    return item.email;
  }
}
