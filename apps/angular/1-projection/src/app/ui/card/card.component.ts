import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, output } from '@angular/core';
import { CardListItemTemplateDirective } from '../list-item/list-item-template.directive';

export enum CardActionType {
  ADD = 'add',
  DELETE = 'delete',
}

export type CardAction =
  | { type: CardActionType.ADD }
  | { type: CardActionType.DELETE; payload: { id: number } };

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content />

      <section>
        @for (item of list(); track item) {
          <ng-container
            [ngTemplateOutlet]="listItemTemplate()?.template"
            [ngTemplateOutletContext]="getItemContext(item)" />
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  imports: [NgTemplateOutlet, CardListItemTemplateDirective],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly customClass = input('');

  actions = output<CardAction>();

  listItemTemplate = contentChild(CardListItemTemplateDirective);

  getItemContext(item: any) {
    return {
      $implicit: item,
      onDeleteAction: (id: number) => this.deleteItem(id),
    };
  }

  addNewItem() {
    this.actions.emit({ type: CardActionType.ADD });
  }

  deleteItem(id: number) {
    this.actions.emit({ type: CardActionType.DELETE, payload: { id } });
  }
}
