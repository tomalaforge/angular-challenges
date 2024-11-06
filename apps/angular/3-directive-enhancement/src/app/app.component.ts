import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForDirective } from './ng-for.directive';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [NgForDirective],
  selector: 'app-root',
  template: `
    <div *appNgFor="let person of persons; empty: emptyList">
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
