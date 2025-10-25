import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, output } from '@angular/core';
import { CardItemDirective } from './card-item-context.directive';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img"></ng-content>

    <section>
      @for (item of list(); track item) {
        <ng-container
          *ngTemplateOutlet="
            itemTemplate().tpl;
            context: { $implicit: item }
          "></ng-container>
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addNewItem()">
      Add
    </button>
  `,
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  imports: [NgTemplateOutlet],
})
export class CardComponent<T> {
  readonly list = input<T[] | null>(null);
  readonly itemTemplate = contentChild.required(CardItemDirective<T>);
  onAddNewItem = output();

  addNewItem() {
    this.onAddNewItem.emit();
  }
}
