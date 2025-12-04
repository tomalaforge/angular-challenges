import { Component } from '@angular/core';
import { HeavyComputationTransformPipe } from './heavy-computation.transform.pipe';

@Component({
  selector: 'app-root',
  template: `
    @for (person of persons; track person) {
      {{ person | heavyComputation: $index }}
    }
  `,
  imports: [HeavyComputationTransformPipe],
})
export class AppComponent {
  persons = ['toto', 'jack', 'marie', 'alice', 'bob'];
}
