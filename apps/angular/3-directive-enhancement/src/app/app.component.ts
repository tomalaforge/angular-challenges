import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForWithEmptyDirective } from './shared/directives/NgForWithEmpty.directive';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [NgForWithEmptyDirective],
  selector: 'app-root',
  template: `
    <div *ngForWithEmpty="let person of persons; empty: emptyList">
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
