import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from './card.component';

@Component({
  imports: [CardComponent],
  selector: 'app-root',
  template: `
    <app-card>
      <div class="title">Title 1</div>
      <div class="message">Message 1</div>
    </app-card>
    <app-card>
      <div class="title">Title 2</div>
    </app-card>
  `,
  host: {
    class: 'p-4 block flex flex-col gap-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
