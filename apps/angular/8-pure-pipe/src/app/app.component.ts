import { Component } from '@angular/core';
import { ShowIndexPipe } from './pipe/show-index.pipe';

@Component({
  selector: 'app-root',
  imports: [ShowIndexPipe],
  template: `
    @for (person of persons; track person) {
      {{ person | showIndex: $index }}
    }
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
