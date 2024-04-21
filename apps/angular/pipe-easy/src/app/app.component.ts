import { Component } from '@angular/core';
import { HeavyComputationPipe } from './heavy-computation.pipe';

@Component({
  standalone: true,
  imports: [HeavyComputationPipe],
  selector: 'app-root',
  template: `
    @for (person of persons; let index = $index; track person) {
      <div>
        {{ person | heavyComputation: index }}
      </div>
    }
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
