import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Person } from './person.model';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  template: `
    <cdk-virtual-scroll-viewport class="h-[300px] w-full" [itemSize]="36">
      <div
        *cdkVirtualFor="let person of persons; trackBy: trackByEmail"
        class="flex h-9 items-center justify-between border-b px-4">
        <h3 class="text-gray-900">{{ person.name }}</h3>
        <p class="text-gray-600">{{ person.email }}</p>
      </div>
    </cdk-virtual-scroll-viewport>
  `,
  styles: [
    `
      cdk-virtual-scroll-viewport {
        &::-webkit-scrollbar {
          width: 8px;
        }
        &::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        &::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        &::-webkit-scrollbar-thumb:hover {
          background: #666;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  @Input() persons: Person[] = [];

  trackByEmail(_: number, person: Person): string {
    return person.email;
  }
}
