import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgForEmptyDirective } from './ng-for-empty.directive';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [NgForEmptyDirective],
  selector: 'app-root',
  template: `
    <div><button (click)="addPerson()">Add</button></div>
    <div *ngForEmpty="let person of persons(); empty: emptyList">
      {{ person.name }}
      <button (click)="removePerson(person)">Remove</button>
    </div>
    <ng-template #emptyList>The list is empty !!</ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons = signal<Person[]>([]);

  addPerson() {
    this.persons.update((persons) => [
      ...persons,
      { name: 'Person ' + persons.length },
    ]);
  }

  removePerson(person: Person) {
    this.persons.update((persons) => persons.filter((p) => p !== person));
  }
}
