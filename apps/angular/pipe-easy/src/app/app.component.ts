import { Component } from '@angular/core';
import { IndexedPipe } from './indexed.pipe';

@Component({
  standalone: true,
  imports: [IndexedPipe],
  selector: 'app-root',
  template: `
    @for (person of persons; track person) {
      <div>
        {{ person | indexed: $index }}
      </div>
    }
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
