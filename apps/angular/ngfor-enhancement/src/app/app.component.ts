import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForEmptyDirective } from './directives/ng-for-empty.directive';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; empty: emptyList">
      {{ person.name }}
    </div>
    <ng-template #emptyList>The list is empty !!</ng-template>
  `,
  imports: [NgForEmptyDirective, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons: Person[] = [];
}
