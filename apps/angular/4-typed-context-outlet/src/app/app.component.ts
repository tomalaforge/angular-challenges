import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListDirective } from './directives/list.directive';
import { PersonDirective } from './directives/person.directive';
import { ListComponent } from './list.component';
import { Person } from './model/person';
import { PersonComponent } from './person.component';

@Component({
  imports: [PersonComponent, ListComponent, PersonDirective, ListDirective],
  selector: 'app-root',
  template: `
    <person [person]="person">
      <ng-template personTemplate #personRef let-name let-age="age">
        {{ name }}: {{ age }}
      </ng-template>
    </person>

    <list [list]="students">
      <ng-template
        listTemplateDirective
        [listOf]="students"
        #listRef
        let-student
        let-i="index">
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
})
export class AppComponent {
  person: Person = {
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
