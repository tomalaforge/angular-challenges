import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForEmptyDirective } from './ngFor.directive';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [NgFor, NgIf, NgForEmptyDirective],
  selector: 'app-root',
  template: `
      <div  *ngFor="let person; of persons; empty emptyList " >
        {{ person.name }}
      </div>
    <ng-template #emptyList>The list is empty !!</ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons: Person[] = [
    // { name: '123'},
    // { name: '456'},
    // { name: '789'},
    // { name: 'abc'},
    // { name: 'hiep'},
  ];
}
