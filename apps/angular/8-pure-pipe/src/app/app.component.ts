import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SimplePipe } from './simple-pipe.pipe';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [SimplePipe],
  template: `
    @for (person of persons; track person) {
      {{ person | simplePipe: $index }}
    }
  `,
})
export class AppComponent {
  public persons: string[] = ['toto', 'jack'];
}
