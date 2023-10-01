import { NgFor, NgIf } from '@angular/common';
import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapFn',
  standalone: true,
})
class WrapFnPipe implements PipeTransform {
  transform<Fn extends (...args: Parameters<Fn>) => ReturnType<Fn>>(
    fn: Fn,
    ...args: Parameters<Fn>
  ): ReturnType<Fn> {
    return fn(...args);
  }
}
@Component({
  standalone: true,
  imports: [NgFor, WrapFnPipe, NgIf],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index; let isFirst = first">
      {{ showName | wrapFn : person.name : index }}
      {{ isAllowed | wrapFn : person.age : isFirst }}
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
