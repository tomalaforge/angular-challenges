import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { CardRowDirective } from './card.directive';

@Component({
  selector: 'app-card',
  template: `
    <ng-content />

    <section>
      @for (item of items(); track item) {
        <ng-template
          [ngTemplateOutlet]="cardRow()"
          [ngTemplateOutletContext]="{ $implicit: item, id: item.id }" />
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addNewItem.emit()">
      Add
    </button>
  `,
  standalone: true,
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T extends { id: number }> {
  items = input.required<T[]>();
  addNewItem = output();
  cardRow = contentChild.required(CardRowDirective, {
    read: TemplateRef,
  });
}
