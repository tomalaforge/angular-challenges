import {
  ChangeDetectionStrategy,
  Component,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CardComponent } from './card.component';

@Component({
  imports: [CardComponent],
  schemas: [NO_ERRORS_SCHEMA],
  selector: 'app-root',
  template: `
    <app-card>
      <card-title>Titre 1</card-title>
      <card-message>Message1</card-message>
    </app-card>
    <app-card>
      <card-title>Titre 2</card-title>
    </app-card>
  `,
  host: {
    class: 'p-4 block flex flex-col gap-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
