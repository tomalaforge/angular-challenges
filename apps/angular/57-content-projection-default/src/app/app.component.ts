import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  signal,
} from '@angular/core';
import { CardComponent } from './card.component';

@Component({
  imports: [CardComponent],
  selector: 'app-root',
  template: `
    <app-card>
      <card-title>{{ title1() }}</card-title>
      <card-message>Message1</card-message>
    </app-card>
    <app-card>
      <card-title>{{ title2() }}</card-title>
    </app-card>
  `,
  host: {
    class: 'p-4 block flex flex-col gap-1',
  },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title1 = signal('Titre 1');
  title2 = signal('Titre 2');
}
