import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="card-img"></ng-content>

    <section>
      @for (item of list(); track item) {
        <app-list-item
          [item]="item"
          [type]="type()"
          (deleteItem)="handleDelete($event)"></app-list-item>
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="onAdd()"
      ngProjectAs="card-add-btn">
      Add
    </button>
  `,
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  imports: [ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly type = input.required<CardType>();

  readonly addNewItem = output<any>();
  readonly delete = output<number>();

  onAdd() {
    this.addNewItem.emit('');
  }

  handleDelete(id: number) {
    this.delete.emit(id);
  }
}
