import { Component, signal } from '@angular/core';
import { PersonUtils } from './person.utils';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-root',
  template: `
    @for (activity of activities(); track activity.name) {
      <div>
        {{ activity.name }} :
        @for (person of persons(); track person.name) {
          <div>
            {{ showName(person.name, $index) }}
            {{ isAllowed(person.age, $first, activity.minimumAge) }}
          </div>
        }
      </div>
    }
  `,
})
export class AppComponent {
  persons = signal([
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ]);

  activities = signal([
    { name: 'biking', minimumAge: 12 },
    { name: 'hiking', minimumAge: 25 },
    { name: 'dancing', minimumAge: 1 },
  ]);

  showName = PersonUtils.showName;

  isAllowed = PersonUtils.isAllowed;
}
