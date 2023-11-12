import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { PersonUtils } from './person.utils';
import { ShowNamePipe } from './show-name.pipe';
import { IsAllowedPipe } from './is-allowed.pipe';

@Component({
  standalone: true,
  imports: [NgFor, ShowNamePipe, IsAllowedPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let activity of activities">
      {{ activity.name }} :
      <div
        *ngFor="let person of persons; let index = index; let isFirst = first">
        {{ person.name | showName : index }}
        {{ person.age | isAllowed : isFirst : activity.minimumAge }}
      </div>
    </div>
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
