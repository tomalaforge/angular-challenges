import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgForWithEmptyDirective } from './ng-for-with-empty.directive';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [NgFor, NgForWithEmptyDirective, NgIf],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons(); empty: emptyList">
      {{ person.name }}
    </div>
    <ng-template #emptyList>The list is empty !!</ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons = signal<Person[]>([]);

  // After 2 seconds, add a person to the list
  constructor() {
    setTimeout(() => {
      this.persons.update((value) => [...value, { name: 'John' }]);
    }, 2000);
  }
}
