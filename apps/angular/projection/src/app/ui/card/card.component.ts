import { Component, Input, SkipSelf } from '@angular/core';
import { Store } from '../../data-access/store';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content></ng-content>

      <section>
        @for (item of list; track item.id) {
          <app-list-item
            [name]="item[showingProp]"
            [id]="item.id"
            (deleteItem)="deleteItem($event)"></app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() showingProp!: string;
  @Input() customClass = '';

  constructor(@SkipSelf() private storeService: Store) {}

  addNewItem() {
    const item = this.storeService.randItem();
    this.storeService.addOne(item);
  }

  deleteItem(id: number) {
    this.storeService.deleteOne(id);
  }
}
