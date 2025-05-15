import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForEmpty } from './empty.directive';

interface Person {
  name: string;
}

@Component({
  imports: [NgForEmpty],
  selector: 'app-root',
  template: `
    <div *ngForEmpty="let person of persons; else: emptyList">
      {{ person.name }}
    </div>
    <ng-template #emptyList>The list is empty !!</ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons: Person[] = [];
}
