import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListComponent } from './components/list.component';
import { Person, PersonComponent } from './components/person.component';
import { ListDirective } from './core/list.directive';
import { PersonDirective } from './core/person.directive';

@Component({
  standalone: true,
  imports: [
    NgTemplateOutlet,
    PersonComponent,
    ListComponent,
    PersonDirective,
    ListDirective,
  ],
  selector: 'app-root',
  template: `
    <person [person]="person">
      <ng-template #personRef personContext let-name let-age="age">
        {{ name }}: {{ age }}
      </ng-template>
    </person>

    <list [list]="students">
      <ng-template #listRef [listContext]="students" let-student let-i="index">
        <div>{{ student.name }}: {{ student.age }} - {{ i }}</div>
      </ng-template>
    </list>

    <list [list]="cities">
      <ng-template #listRef [listContext]="cities" let-city let-i="index">
        <div>{{ city.name }}: {{ city.country }} - {{ i }}</div>
      </ng-template>
    </list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  person: Person = {
    name: 'toto ERT',
    age: 35,
  };

  students = [
    { name: 'toto', age: 33 },
    { name: 'titi', age: 4 },
  ];

  cities = [
    { name: 'Paris', country: 'France' },
    { name: 'Berlin', country: 'Germany' },
  ];
}
