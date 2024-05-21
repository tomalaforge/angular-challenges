import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { WrapperCallbackPipe } from './wrapper-callback.pipe';

@Component({
  standalone: true,
  imports: [NgFor, WrapperCallbackPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index; let isFirst = first">
      {{ person | wrapperCallback: { name: person.name, index } : showName }}
      {{ person | wrapperCallback: { age: person.age, isFirst } : isAllowed }}
    </div>
  `,
})
export class AppComponent {
  persons = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];

  showName(param: { name: string; index: number }) {
    return `${param.name} - ${param.index}`;
  }

  isAllowed(param: { age: number; isFirst: boolean }) {
    if (param.isFirst) {
      return 'always allowed';
    } else {
      return param.age > 25 ? 'allowed' : 'declined';
    }
  }
}
