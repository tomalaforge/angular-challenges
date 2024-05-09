import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { PersonUtils } from './person.utils';
import { UtilsPipe } from './utils.pipe';

@Component({
  standalone: true,
  imports: [NgFor, UtilsPipe],
  selector: 'app-root',
  template: `
    @for (activity of activities; track $index) {
      <div>{{ activity.name }} :</div>
      @for (
        person of persons;
        track index;
        let index = $index, first = $first
      ) {
        <div>
          {{ showName | utils: [person.name, index] }}
          {{ isAllowed | utils: [person.age, first, activity.minimumAge] }}
        </div>
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

  showName = PersonUtils.showName;

  isAllowed = PersonUtils.isAllowed;
}
