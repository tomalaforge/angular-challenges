import { Component } from '@angular/core';
import { WrapperPipe } from './wrapper.pipe';

@Component({
  standalone: true,
  imports: [WrapperPipe],
  selector: 'app-root',
  template: `
    @for (person of persons; track person) {
      <div>
        {{ showName | wrapperFn: person.name : $index }}
        {{ isAllowed | wrapperFn: person.age : $first }}
      </div>
    } @empty {
      <div>there is no person</div>
    }
  `,
})
export class AppComponent {
  persons = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
    { name: 'Hannibal', age: 60 },
    { name: 'Hitler', age: 35 },
    { name: 'Stalin', age: 20 },
  ];

  public showName(name: string, index: number) {
    return `${name} - ${index}`;
  }

  public isAllowed(age: number, isFirst: boolean) {
    return isFirst ? 'always allowed' : age > 25 ? 'allowed' : 'declined';
  }
}
