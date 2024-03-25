import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemRefDirective } from '../list-item/ListItemTemplateRef.directive';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <img [src]="imageUrl" width="200px" />
      <section>
        @for (item of list; track item.id) {
          <ng-template
            [ngTemplateOutlet]="listItemTemplateRef"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        }
      </section>
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItemFunc()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [ListItemComponent, NgTemplateOutlet],
})
export class CardComponent<T extends { id: number }> {
  @Input() list: any[] | null = null;
  @Input() imageUrl: any;
  // @Input() type!: CardType;
  @Input() customClass = '';
  @Output() addNewItem: EventEmitter<void> = new EventEmitter<void>();

  CardType = CardType;
  @ContentChild(ListItemRefDirective, { read: TemplateRef })
  listItemTemplateRef!: TemplateRef<{ $implicit: T }>;

  addNewItemFunc() {
    this.addNewItem.emit();
  }
}
