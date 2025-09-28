import { Component, input } from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="[slot=image]"></ng-content>

      <section>
        @for (item of list(); track item) {
          <app-list-item
            [name]="item.firstName"
            [id]="item.id"
            [type]="type()"></app-list-item>
        }
      </section>

      <ng-content select="[slot=addItem]"></ng-content>
    </div>
  `,
  imports: [ListItemComponent],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly type = input.required<CardType>();
  readonly customClass = input('');
}
