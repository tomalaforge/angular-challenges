import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForEnhancenedDirective } from './ng-for-enhancened.directive';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [NgForEnhancenedDirective],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; else: emptyList">
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
