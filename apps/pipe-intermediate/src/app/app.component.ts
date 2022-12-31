import { NgFor } from '@angular/common';
import { Component, Pipe, PipeTransform } from '@angular/core';

/* eslint-disable @typescript-eslint/no-explicit-any */
@Pipe({
  standalone: true,
  pure: true,
  name: 'invoke',
})
export class CallFunctionPipe implements PipeTransform {
  transform<TFunc extends (...args: any[]) => any>(
    func: TFunc,
    ...args: Parameters<TFunc>
  ): any {
    return `Piped: ${func(...args)}`;
  }
}

@Component({
  standalone: true,
  imports: [NgFor, CallFunctionPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index; let isFirst = first">
      {{ showName | invoke : person.name : index }}
      {{ isAllowed | invoke : person.age : isFirst }}
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
