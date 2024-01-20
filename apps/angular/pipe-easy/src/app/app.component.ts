import { NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { HeavyComputationPipe } from './heavy-computation.pipe';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    @for (person of persons(); track $index) {
      <div>
        {{ person | heavy: $index }}
      </div>
    }
  `,
  imports: [NgFor, HeavyComputationPipe],
})
export class AppComponent {
  persons = signal<string[]>(['toto', 'jack']);
}
