// app.component.ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeavyComputationPipe } from './heavy-computation.pipe';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeavyComputationPipe],
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    @for (person of persons; track person) {
      {{ person | heavyComputation: $index }}
    }
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];

  // heavyComputation(name: string, index: number) {
  //   // very heavy computation
  //   return `${name} - ${index}`;
  // }
}
