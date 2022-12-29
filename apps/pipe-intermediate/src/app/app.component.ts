import { NgFor } from '@angular/common';
import { Component, Pipe, PipeTransform } from '@angular/core';

/* eslint-disable @typescript-eslint/no-explicit-any */
@Pipe({
  standalone: true,
  pure: true,
  name: 'callFunction',
})
export class CallFunctionPipe implements PipeTransform {
  transform(
    functionName: keyof Omit<CallFunctionPipe, 'transform'>,
    ...args: any[]
  ): any {
    const func = <any>this[functionName];
    return func(...args);
  }

  showName(name: string, index: number) {
    // very heavy computation
    return `Piped: ${name} - ${index}`;
  }

  isAllowed(age: number, isFirst: boolean) {
    if (isFirst) {
      return 'always allowed';
    } else {
      return age > 25 ? 'allowed' : 'declined';
    }
  }
}

@Component({
  standalone: true,
  imports: [NgFor, CallFunctionPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index; let isFirst = first">
      {{ 'showName' | callFunction : person.name : index }}
      {{ 'isAllowed' | callFunction : person.age : isFirst }}
    </div>
  `,
})
export class AppComponent {
  persons = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];
}
