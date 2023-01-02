import { NgFor } from '@angular/common';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { IsAllowedParams, ShowNameParams, PersonUtils } from './person.utils';

@Pipe({
  name: 'compute',
  pure: true,
  standalone: true,
})
export class ComputePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(
    value: IsAllowedParams | ShowNameParams,
    funcName: 'showName' | 'isAllowed'
  ): string {
    if (funcName === 'isAllowed' && 'age' in value) {
      return PersonUtils.isAllowed(value.age, value.isFirst, value.activityAge);
    } else if ('name' in value) {
      return PersonUtils.showName(value.name, value.index);
    } else {
      return '';
    }
  }
}

@Component({
  standalone: true,
  imports: [NgFor, ComputePipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let activity of activities">
      {{ activity.name }} :
      <div
        *ngFor="let person of persons; let index = index; let isFirst = first">
        {{ { name: person.name, index } | compute : 'showName' }}
        {{
          { age: person.age, isFirst, activityAge: activity.minimumAge }
            | compute : 'isAllowed'
        }}
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
}
