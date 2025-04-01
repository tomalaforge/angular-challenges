import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from './card.component';

@Component({
  imports: [CardComponent],
  selector: 'app-root',
  template: `
    <app-card title="Titre 1" message="Message1">
      <div ngProjectAs="title">Titre 1</div>
      <div ngProjectAs="message">Message1</div>
    </app-card>
    <app-card title="Titre 2">
      <div ngProjectAs="title">Titre 2</div>
    </app-card>
  `,
  host: {
    class: 'p-4 block flex flex-col gap-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
