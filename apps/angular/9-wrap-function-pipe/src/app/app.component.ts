import { Component } from '@angular/core';
import { WrapFunctionPipe } from '../pipes/wrapFunction-pipe';

@Component({
  selector: 'app-root',
  template: `
    @for (person of persons; track person.name) {
      {{ showName | wrapFn: person.name : $index }}
      {{ isAllowed | wrapFn: person.age : $first }}
    }
  `,
  imports: [WrapFunctionPipe],
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
