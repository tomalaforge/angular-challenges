import { CommonModule, NgFor, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="[img-top]"></ng-content>

      <section>
        <ng-container *ngFor="let item of items">
          <ng-template
            [ngTemplateOutlet]="rowTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        </ng-container>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgFor, ListItemComponent, CommonModule, NgTemplateOutlet],
})
export class CardComponent<T> {
  @Input() items: T[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';
  @Output() addNewRow = new EventEmitter();
  @Output() deleteItem = new EventEmitter<number>();

  @ContentChild('rowRef', { read: TemplateRef })
  rowTemplate!: TemplateRef<{ $implicit: T }>;

  CardType = CardType;

  constructor() {}

  addNewItem() {
    this.addNewRow.emit();
  }
}
