import { Component } from '@angular/core';
import { IsAllowedPipe, ShowNamePipe } from './wrapper.pipe';

@Component({
  standalone: true,
  imports: [ShowNamePipe, IsAllowedPipe],
  selector: 'app-root',
  template: `
    @for (person of persons; track person) {
      <div>
        {{ person.name | showName: $index }}
        {{ person.age | isAllowed: $index === 0 }}
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
}
