import { Component, input, output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content></ng-content>

      <section>
        @for (item of list(); track item) {
          <app-list-item
            [name]="displayNameFn()(item)"
            [id]="item.id"
            (itemDeleted)="itemDeleted.emit($event)"></app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  imports: [ListItemComponent],
})
export class CardComponent {
  itemDeleted = output<number>();
  itemAdded = output<void>();

  readonly list = input<any[] | null>(null);
  readonly customClass = input('');
  readonly displayNameFn = input<(item: any) => string>(() => '');

  addNewItem() {
    this.itemAdded.emit();
  }
}
