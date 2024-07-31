import { Component } from '@angular/core';
import { FormatNamePipe } from './FormatNamePipe.pipe';

@Component({
  standalone: true,
  imports: [FormatNamePipe],
  selector: 'app-root',
  template: `
    @for (person of persons; track person + $index) {
      <div>
        {{ person | formatName: $index }}
      </div>
    } @empty {
      <div>There are no names.</div>
    }
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];

  heavyComputation(name: string, index: number) {
    return `${name} - ${index}`;
  }
}
