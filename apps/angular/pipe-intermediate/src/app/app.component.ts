import { Component } from '@angular/core';
import { WrapFnPipe } from './wrap-fn.pipe';

@Component({
  standalone: true,
  imports: [WrapFnPipe],
  selector: 'app-root',
  template: `
    @for (person of persons; track person.name) {
      <div>
        {{ showName | wrapFn: person.name : $index }}
        {{ isAllowed | wrapFn: person.age : $first }}
      </div>
    }
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
