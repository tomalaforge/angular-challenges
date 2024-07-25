import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MyForDirective } from './my.directive';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [MyForDirective],
  selector: 'app-root',
  template: `
    <div *myFor="let person of persons; let index = index; empty: emptyList">
      {{ person.name }} - {{ index }}
    </div>
    <ng-template #emptyList>The list is empty !!</ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons: Person[] = [];
}
