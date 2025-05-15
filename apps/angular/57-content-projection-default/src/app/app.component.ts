import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from './card.component';

@Component({
  selector: 'app-root',
  imports: [CardComponent],
  template: `
    <app-card>
      <div ngProjectAs="card-title">Titre 1</div>
      <div ngProjectAs="card-message">Message1</div>
    </app-card>
    <app-card>
      <div ngProjectAs="card-title">Titre 2</div>
    </app-card>
  `,
  host: {
    class: 'p-4 block flex flex-col gap-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
