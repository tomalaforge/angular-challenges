import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { CardListItemDirective } from './card-list-item.directive';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="[image]"></ng-content>
    <section>
      @for (item of list; track item) {
        <ng-template
          [ngTemplateOutlet]="rowTemplate"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addedNewItem()">
      Add
    </button>
  `,
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  standalone: true,
  imports: [ListItemComponent, CommonModule, CardListItemDirective],
})
export class CardComponent<T> {
  @Input() list: T[] | null = null;
  @Output() addedItem = new EventEmitter<void>();
  @ContentChild(CardListItemDirective, { read: TemplateRef })
  rowTemplate!: TemplateRef<{ $implicit: any }>;

  addedNewItem() {
    this.addedItem.emit();
  }
}
