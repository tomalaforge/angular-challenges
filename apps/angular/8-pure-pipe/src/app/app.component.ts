import { Component } from '@angular/core';
import { IndexPipe } from './index.pipe';

@Component({
  selector: 'app-root',
  template: `
    @for (person of persons; track person; let i = $index) {
      <div>{{ person | indexer: i }}</div>
    }
  `,
  imports: [IndexPipe],
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
