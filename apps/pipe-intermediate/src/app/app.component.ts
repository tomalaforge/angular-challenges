import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { WrapFnPipe } from './wrap-fn.pipe';

@Component({
  standalone: true,
  imports: [NgFor, WrapFnPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index; let isFirst = first">
      {{ showName | wrapFn : person.name : index }}
      {{ isAllowed | wrapFn : person.age : isFirst }}
      {{ test | wrapFn : person.name : index : isFirst }}
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

  test(name: string, index: number, isFirst: boolean) {
    return name + index + isFirst;
  }
}
