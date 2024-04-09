import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListComponent, ListDirective } from './list.component';
import { PersonComponent, PersonDirective } from './person.component';

@Component({
  standalone: true,
  imports: [
    NgTemplateOutlet,
    PersonComponent,
    ListComponent,
    ListDirective,
    PersonDirective,
  ],
  selector: 'app-root',
  template: `
    <person [person]="person">
      <div *appPerson="person">{{ person.name }}: {{ person.age }}</div>
    </person>

    <list [list]="students">
      <div *appList="students as student; index as i">
        {{ student.name }}: {{ student.age }} - {{ i }}
      </div>
    </list>

    <list [list]="cities">
      <div *appList="cities as city; index as i">
        {{ city.name }}: {{ city.country }} - {{ i }}
      </div>
    </list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  person = {
    name: 'toto',
    age: 3,
  };

  students = [
    { name: 'toto', age: 3 },
    { name: 'titi', age: 4 },
  ];

  cities = [
    { name: 'Paris', country: 'France' },
    { name: 'Berlin', country: 'Germany' },
  ];
}
