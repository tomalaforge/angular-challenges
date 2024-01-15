/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from '@angular/core';

import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <ng-container [ngTemplateOutlet]="imgTemplate"></ng-container>
    <section>
      @for (item of list; track item.id) {
        <app-list-item
          [name]="item[content]"
          [id]="item.id"
          [deleteTemplate]="deleteTemplate"></app-list-item>
      }
    </section>
    <ng-container [ngTemplateOutlet]="buttonTemplate"></ng-container>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() content = '';
  @Input() imgTemplate!: TemplateRef<any>;
  @Input() buttonTemplate!: TemplateRef<any>;
  @Input() deleteTemplate!: TemplateRef<any>;

  CardType = CardType;

  constructor() {}
}
