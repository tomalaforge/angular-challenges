import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeavyComputationPipe } from './heavy-compuation.pipe';

@Component({
  standalone: true,
  imports: [HeavyComputationPipe],
  selector: 'app-root',
  template: `
    @for (person of persons; track index; let index = $index) {
      <div>
        {{ person | heavyComputation: index }}
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
