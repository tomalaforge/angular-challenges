import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ListComponent, ListDirective } from './list.component';
import { PersonComponent, PersonDirective } from './person.component';

@Component({
  standalone: true,
  imports: [
    ListComponent,
    ListDirective,
    NgTemplateOutlet,
    PersonComponent,
    PersonDirective,
  ],
  selector: 'app-root',
  template: `
    <person [person]="person()">
      <ng-container *person="let name; age as age">
        {{ name }}: {{ age }}
      </ng-container>
    </person>

    <list [list]="students()">
      <ng-container *appList="students() as student; index as i">
        {{ student.name }}: {{ student.age }} - {{ i }}
      </ng-container>
    </list>

    <list [list]="cities()">
      <ng-container *appList="cities() as city; index as i">
        {{ city.name }}: {{ city.country }} - {{ i }}
      </ng-container>
    </list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  person = signal({
    name: 'toto',
    age: 3,
  });

  students = signal([
    { name: 'toto', age: 3 },
    { name: 'titi', age: 4 },
  ]);

  cities = signal([
    { name: 'Paris', country: 'France' },
    { name: 'Berlin', country: 'Germany' },
  ]);
}
