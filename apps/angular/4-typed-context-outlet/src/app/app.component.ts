import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListComponent, ListDirective } from './list.component';
import { Person, PersonComponent, PersonDirective } from './person.component';

interface Student {
  readonly name: string;
  readonly age: number;
}

interface City {
  readonly name: string;
  readonly country: string;
  readonly population: number;
  readonly continent: string;
  readonly language: string;
}

@Component({
  imports: [PersonComponent, ListComponent, PersonDirective, ListDirective],
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  person: Person = {
    name: 'toto',
    age: 3,
  };

  students: Student[] = [
    { name: 'toto', age: 3 },
    { name: 'titi', age: 4 },
  ];

  cities: City[] = [
    {
      name: 'Paris',
      country: 'France',
      population: 2161000,
      continent: 'Europe',
      language: 'French',
    },
    {
      name: 'Berlin',
      country: 'Germany',
      population: 3645000,
      continent: 'Europe',
      language: 'German',
    },
  ];
}
