import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  TemplateRef,
  Directive,
} from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Directive({
  selector: '[itemList]',
  standalone: true,
})
export class CardListItemDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Component({
  selector: 'app-card',
  template: ` <ng-content select="[img-header]"></ng-content>

    <section>
      @if (list.length > 0) {
        @for (item of list; track item) {
          <ng-container
            [ngTemplateOutlet]="itemList.templateRef"
            [ngTemplateOutletContext]="{ $implicit: item }">
          </ng-container>
        }
      } @else {
        <p>Empty List</p>
      }
    </section>

    <button
      class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
      (click)="addNewItem.emit()">
      Add
    </button>`,
  standalone: true,
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  imports: [
    NgIf,
    NgFor,
    NgTemplateOutlet,
    ListItemComponent,
    ListItemComponent,
    AsyncPipe,
  ],
})
export class CardComponent<T> {
  @Input() list: T[] = [];
  @Input() type!: CardType;

  @Input() customClass = '';
  @Output() addNewItem: EventEmitter<void> = new EventEmitter<void>();
  @ContentChild(CardListItemDirective)
  itemList!: CardListItemDirective;
  CardType = CardType;
}
