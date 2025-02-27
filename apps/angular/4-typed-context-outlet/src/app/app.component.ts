import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListComponent } from './list.component';
import { PersonComponent } from './person.component';

interface Student {
  name: string;
  age: number;
}

interface City {
  name: string;
  country: string;
}

@Component({
  imports: [PersonComponent, ListComponent],
  selector: 'app-root',
  template: `
    <person [person]="person">
      <ng-template #personRef let-name let-age="age">
        {{ name }}: {{ age }}
      </ng-template>
    </person>

    <list [list]="students">
      <ng-template #listRef let-student let-i="index">
        {{ student.name }}: {{ student.age }} - {{ i }}
      </ng-template>
    </list>

    <list [list]="cities">
      <ng-template #listRef let-city let-i="index">
        {{ city.name }}: {{ city.country }} - {{ i }}
      </ng-template>
    </list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AppComponent {
  person = {
    name: 'toto',
    age: 3,
  };

  students: Student[] = [
    { name: 'toto', age: 3 },
    { name: 'titi', age: 4 },
  ];

  cities: City[] = [
    { name: 'Paris', country: 'France' },
    { name: 'Berlin', country: 'Germany' },
  ];
}
