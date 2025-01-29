import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { CardType } from '../../model/card.model';
import { CardRowDirective } from './card-row.directive';

@Component({
  selector: 'app-card',
  template: `
    <ng-content></ng-content>
    <section>
      @for (item of items(); track item.id) {
        <ng-template
          [ngTemplateOutlet]="cardRow()"
          [ngTemplateOutletContext]="{ $implicit: item }" />
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addNewItem.emit()">
      Add
    </button>
  `,
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  imports: [NgTemplateOutlet],
})
export class CardComponent<T extends { id: number }> {
  public readonly items = input.required<T[]>();

  public readonly addNewItem = output();

  public readonly cardRow = contentChild.required(CardRowDirective, {
    read: TemplateRef,
  });

  CardType = CardType;
}
