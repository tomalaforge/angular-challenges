import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForEmptyDirective } from './ng-for-empty.directive';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [NgForEmptyDirective],
  template: `
    <div
      *ngFor="let person of persons; empty: emptyList; ngForTrackBy: trackByFn">
      {{ person.name }}
    </div>
    <ng-template #emptyList>The list is empty !!</ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons: Person[] = [];

  trackByFn(index: number, person: Person): string {
    return `${person.name}-${index}`;
  }
}
