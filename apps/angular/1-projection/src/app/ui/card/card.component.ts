import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, output } from '@angular/core';
import { CardListItemTemplateDirective } from './card-list-item-template.directive';

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
            *ngTemplateOutlet="
              listItemTemplate()?.template ?? null;
              context: { $implicit: item, item: item }
            "></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }

      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }

      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [NgTemplateOutlet, CardListItemTemplateDirective],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly customClass = input('');
  onAddNewItem = output<void>();

  // Use contentChild to query for the directive
  listItemTemplate = contentChild(CardListItemTemplateDirective);

  addNewItem() {
    this.onAddNewItem.emit();
  }
}
