import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  Directive,
  input,
  output,
  TemplateRef,
} from '@angular/core';

@Directive({
  selector: 'ng-template [card-list-item]',
})
export class CardListItemDirective {}

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="[card-image]" />

      <section>
        @for (item of list(); track item) {
          <ng-template
            [ngTemplateOutlet]="listTemplateRef()"
            [ngTemplateOutletContext]="{ $implicit: item }" />
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  imports: [NgTemplateOutlet],
})
export class CardComponent<T> {
  addItemEvent = output();
  deleteItemEvent = output<number>();
  readonly list = input<T[]>([]);
  readonly customClass = input('');
  readonly listTemplateRef = contentChild(CardListItemDirective, {
    read: TemplateRef<{ $implicit: T }>,
  });

  addNewItem() {
    this.addItemEvent.emit();
  }
}
