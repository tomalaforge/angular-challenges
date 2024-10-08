import { Component } from '@angular/core';
import { HeavyComputation } from './heavy-computaion.pipe';

@Component({
  standalone: true,
  imports: [HeavyComputation],
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
