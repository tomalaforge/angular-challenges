import { Component } from '@angular/core';
import { HeavyComputationPipe } from './heavy-computation.pipe';

@Component({
  imports: [HeavyComputationPipe],
  selector: 'app-root',
  template: `
    @for (person of persons; track $index) {
      <div>
        {{ person | heavyComputation: $index }}
      </div>
    }
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
