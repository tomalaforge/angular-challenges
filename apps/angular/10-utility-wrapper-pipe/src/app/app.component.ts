import { Component } from '@angular/core';
import { UtilityPipe } from './pipes/utility-pipe';

@Component({
  selector: 'app-root',
  imports: [UtilityPipe],
  template: `
    @for (activity of activities; track activity.name) {
      {{ activity.name }} :
      @for (
        person of persons;
        track person.name;
        let index = $index;
        let isFirst = $first
      ) {
        {{ 'PersonUtils.showName' | utility: person.name : index }}
        {{
          'PersonUtils.isAllowed'
            | utility: person.age : isFirst : activity.minimumAge
        }}
      }
    }
  `,
})
export class AppComponent {
  persons = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];

  activities = [
    { name: 'biking', minimumAge: 12 },
    { name: 'hiking', minimumAge: 25 },
    { name: 'dancing', minimumAge: 1 },
  ];
}
