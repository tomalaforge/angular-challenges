import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { UtilsPipe } from './pipes/utils.pipe';

interface Person {
  name: string;
  age: number;
}

interface Activity {
  name: string;
  minimumAge: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, UtilsPipe],
  template: `
    <div *ngFor="let activity of activities">
      {{ activity.name }} :
      <div
        *ngFor="let person of persons; let index = index; let isFirst = first">
        {{ 'showName' | utils: person.name : index }}
        {{ 'isAllowed' | utils: person.age : isFirst : activity.minimumAge }}
      </div>
    </div>
  `,
})
export class AppComponent {
  persons: Person[] = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];

  activities: Activity[] = [
    { name: 'biking', minimumAge: 12 },
    { name: 'hiking', minimumAge: 25 },
    { name: 'dancing', minimumAge: 1 },
  ];
}
