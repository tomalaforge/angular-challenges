import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForEmpty } from './common/directives/ngForEmpty.directive';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [NgForEmpty, NgIf],
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
