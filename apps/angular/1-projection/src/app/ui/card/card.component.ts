import { CommonModule, NgTemplateOutlet } from '@angular/common';
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
  standalone: true,
})
export class CardListDirective {}

@Component({
  selector: 'app-card',
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  template: `
    <ng-content select="[card-header]"></ng-content>
    <section>
      @for (item of list(); track item) {
        <ng-template
          [ngTemplateOutlet]="cardRow()"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
      }
    </section>
    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addNewItem.emit()">
      Add
    </button>
  `,
  imports: [CommonModule, NgTemplateOutlet],
})
export class CardComponent<T> {
  readonly list = input<T[]>([]);
  readonly customClass = input('');
  addNewItem = output();
  cardRow = contentChild.required(CardListDirective, {
    read: TemplateRef<{ $implicit: T }>,
  });
}
