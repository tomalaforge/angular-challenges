import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListComponent, ListRefDirective } from './list.component';
import {
  Person,
  PersonComponent,
  PersonRefDirective,
} from './person.component';

export type City = {
  name: string;
  country: string;
};

@Component({
  standalone: true,
  imports: [
    NgTemplateOutlet,
    PersonComponent,
    ListComponent,
    PersonRefDirective,
    ListRefDirective,
  ],
  selector: 'app-root',
  template: `
    <person [person]="person">
      <ng-template person let-name let-age="age">
        {{ name }}: {{ age }}
      </ng-template>
    </person>

    <list [list]="students">
      <ng-template [list]="students" let-student let-i="index">
        {{ student.name }}: {{ student.age }} - {{ i }}
      </ng-template>
    </list>

    <list [list]="cities">
      <ng-template [list]="cities" let-city let-i="index">
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

  students: Person[] = [
    { name: 'toto', age: 3 },
    { name: 'titi', age: 4 },
  ];

  cities: City[] = [
    { name: 'Paris', country: 'France' },
    { name: 'Berlin', country: 'Germany' },
  ];
}
