import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyDirective } from './empty.directive';
import { NgForDirective } from './ngFor.directive';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [EmptyDirective, NgForDirective],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; empty: emptyList">
      {{ person.name }}
    </div>
    <ng-template #emptyList appEmptyListDirective>
      There is no data !!!
    </ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons: Person[] = [];
}
