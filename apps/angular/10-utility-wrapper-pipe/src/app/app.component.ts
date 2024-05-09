import { Component, signal } from '@angular/core';
import { PersonUtilPipe } from './person-util.pipe';

@Component({
  standalone: true,
  imports: [PersonUtilPipe],
  selector: 'app-root',
  template: `
    @for (activity of activities(); track activity.name) {
      <div>
        {{ activity.name }} :
        @for (person of persons(); track person.name) {
          <div>
            {{ 'showName' | personUtil: person.name : $index }}
            {{
              'isAllowed'
                | personUtil: person.age : $first : activity.minimumAge
            }}
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
}
