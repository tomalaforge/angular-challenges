import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from './card.component';

@Component({
  imports: [CardComponent],
  selector: 'app-root',
  template: `
    @for (card of cardsArr; track card.title) {
      <app-card>
        <div>{{ card.title }}</div>
        @if (card.message) {
          <div>{{ card.message }}</div>
        } @else {
          <div>Aucun message</div>
        }
      </app-card>
    }
  `,
  host: {
    class: 'p-4 block flex flex-col gap-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  cardsArr: { title: string; message?: string }[] = [
    { title: 'Titre 1', message: 'Message1' },
    { title: 'Titre 2' },
  ];
}
