import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ArrayToTextPipe } from './array-to-text.pipe';

@Component({
  standalone: true,
  imports: [NgFor, ArrayToTextPipe],
  selector: 'app-root',
  template: `
  @for (person of persons; let index = $index ;track person) {
    <div>
      {{ person | arrayToText: index }}
    </div>
  }
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
