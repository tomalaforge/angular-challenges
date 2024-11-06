import { Component } from '@angular/core';
import { PersonPipe } from './person.pipe';
import { Person } from './types';

@Component({
  standalone: true,
  imports: [PersonPipe],
  selector: 'app-root',
  template: `
    @for (person of persons; track person) {
      <div>
        {{ person | person: $index }}
      </div>
    }
  `,
})
export class AppComponent {
  persons: Person[] = ['toto', 'jack'];
}
