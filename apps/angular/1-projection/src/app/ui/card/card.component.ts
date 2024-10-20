import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div [class]="customClass">
      <img [src]="image" />
      <section>
        @for (item of list; track item.id) {
          <app-list-item
            [name]="item.firstName || item.name"
            [id]="item.id"
            [type]="type"></app-list-item>
        }
      </section>
      <ng-content></ng-content>
    </div>
  `,
  standalone: true,
  imports: [NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';
  @Input() image = '';
}
