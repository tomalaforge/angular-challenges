import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',

  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4 "
      [class]="customClass()">
      <ng-content select="img"></ng-content>
      <section>
        @for (item of list(); track item) {
          <app-list-item
            [name]="item.firstName"
            [id]="item.id"
            [type]="type()"></app-list-item>
          <span>{{ item.firstName }}</span>
          <ng-container
            [ngTemplateOutlet]="listTemplate"
            [ngTemplateOutletContext]="{
              item: item
            }"></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="onAddNewItem()">
        Add
      </button>
    </div>
  `,
  imports: [ListItemComponent, NgTemplateOutlet, CommonModule],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly type = input.required<CardType>();
  readonly customClass = input('');
  @ContentChild('listTemplate') listTemplate!: TemplateRef<ListItemComponent>;

  onAddNewItem() {
    this.addNewItem.emit();
  }

  onDeleteItem(id: number) {
    this.deleteItem.emit(id);
  }

  addNewItem = output();
  deleteItem = output<number>();
}
