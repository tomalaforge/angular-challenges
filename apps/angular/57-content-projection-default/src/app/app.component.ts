import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from './card.component';

@Component({
  imports: [CardComponent],
  selector: 'app-root',
  template: `
    <app-card>
      <div>Title 1</div>
      <div>Message 1</div>
    </app-card>
    <app-card>
      <div>Title 2</div>
      <div>Aucun message</div>
    </app-card>
  `,
  host: {
    class: 'p-4 block flex flex-col gap-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
