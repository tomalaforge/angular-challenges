import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { wrapFnPipe } from './pipes/wrapFn.pipe';

@Component({
  standalone: true,
  imports: [NgFor, wrapFnPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index; let isFirst = first">
      {{ showName(person.name, index) }}
      {{ isAllowed(person.age, isFirst) }}
    </div>
    <div *ngFor="let person of persons; let index = index; let isFirst = first">
      {{ person.name | wrapFn: index : person.age : isFirst }}
    </div>
  `,
})
export class AppComponent {
  persons = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];

  showName(name: string, index: number) {
    // very heavy computation
    return `${name} - ${index}`;
  }

  isAllowed(age: number, isFirst: boolean) {
    if (isFirst) {
      return 'always allowed';
    } else {
      return age > 25 ? 'allowed' : 'declined';
    }
  }
}
