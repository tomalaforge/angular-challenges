import { NgFor } from '@angular/common';
import {
  Component,
  Inject,
  InjectionToken,
  Pipe,
  PipeTransform,
} from '@angular/core';

const CallFunctionPipeSource = new InjectionToken('CallFunctionPipeSource');

/* eslint-disable @typescript-eslint/no-explicit-any */
@Pipe({
  standalone: true,
  pure: true,
  name: 'callFunction',
})
export class CallFunctionPipe implements PipeTransform {
  constructor(@Inject(CallFunctionPipeSource) private readonly source: any) {}

  transform(functionName: string, ...args: any[]): any {
    const func = this.source[functionName];
    return func(...args);
  }
}

@Component({
  standalone: true,
  imports: [NgFor, CallFunctionPipe],
  selector: 'app-root',
  providers: [{ provide: CallFunctionPipeSource, useExisting: AppComponent }],
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
