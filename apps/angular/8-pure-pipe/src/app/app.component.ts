import { Component } from '@angular/core';
import { HeavyComputationPipe } from './heavy-computation.pipe';

@Component({
  selector: 'app-root',
  template: `
    @for (person of persons; track person) {
      {{ person | heavyComputation: $index }}
    }
  `,
  imports: [HeavyComputationPipe],
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
