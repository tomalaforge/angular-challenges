import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgForTrackByModule } from '@angular-challenges/shared/directives';
import { Person } from './person.model';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [NgForTrackByModule, ScrollingModule],
  template: `
    <div class="h-[500px] relative overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <cdk-virtual-scroll-viewport appendOnly itemSize="50" class="h-full">
          <div
            *cdkVirtualFor="let person of persons"
            class="flex justify-between items-center border-b h-9 z-50">
            <h3>{{ person.name }}</h3>
            <p>{{ person.email }}</p>
          </div>
        </cdk-virtual-scroll-viewport>
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
