import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListComponent, ListTemplateDirective } from './list.component';
import { PersonComponent, PersonTemplateDirective } from './person.component';
import { JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    PersonComponent,
    ListComponent,
    ListTemplateDirective,
    PersonTemplateDirective,
    JsonPipe,
  ],
  selector: 'app-root',
  template: `
    <person [person]="person">
      <ng-template appPerson let-name let-age="age">
        {{ name }}: {{ age }}
      </ng-template>
    </person>

    <list [list]="students">
      <ng-container *appList="students as student; index as i">
        {{ student.name }}: {{ student.age }} - {{ i }}
      </ng-container>
    </list>

    <list [list]="cities">
      <ng-container *appList="cities as city; index as i">
        {{ city.name }}: {{ city.name }} - {{ i }}
      </ng-container>
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
