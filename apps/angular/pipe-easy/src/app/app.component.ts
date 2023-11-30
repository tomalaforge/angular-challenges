import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NameIndexPipe } from './name-index.pipe';

@Component({
  standalone: true,
  imports: [NgFor, NameIndexPipe],
  selector: 'app-root',
  template: `
    @for (person of persons; track person; let index = $index) {
      <li>
        {{ person | nameIndex: index }}
      </li>
    }
  `,
})
export class AppComponent {
  persons: string[] = ['toto', 'jack'];
}
