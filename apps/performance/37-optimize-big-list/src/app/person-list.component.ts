import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { NgForTrackByModule } from '@angular-challenges/shared/directives';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Person } from './person.model';

@Component({
  selector: 'app-person-list',
  imports: [CommonModule, NgForTrackByModule, ScrollingModule],
  template: `
    <div class="relative h-[300px] overflow-hidden">
      <div class="absolute inset-0 overflow-scroll">
        <cdk-virtual-scroll-viewport
          class="h-full"
          itemSize="50"
          minBufferPx="0"
          maxBufferPx="50">
          <div
            *cdkVirtualFor="let person of persons(); trackBy: trackByEmail"
            class="flex h-9 items-center justify-between border-b">
            <h3>{{ person.name }}</h3>
            <p>{{ person.email }}</p>
          </div>
        </cdk-virtual-scroll-viewport>
        <!--        <div-->
        <!--          *ngFor="let person of persons; trackByProp: 'email'"-->
        <!--          class="flex h-9 items-center justify-between border-b">-->
        <!--          <h3>{{ person.name }}</h3>-->
        <!--          <p>{{ person.email }}</p>-->
        <!--        </div>-->
      </div>
    </div>
  `,
  host: {
    class: 'w-full flex flex-col',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  persons = input.required<Person[]>();

  trackByEmail(index: number, person: Person): string {
    return person.email;
  }
}
