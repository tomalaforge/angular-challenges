import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  TemplateRef,
  contentChild,
  input,
  output,
} from '@angular/core';
import { CardRowDirective } from './card-row.directive';

export type CardType<T> = {
  id: number;
  name: string;
  value: T;
};

@Component({
  selector: 'app-card',
  template: `
    <ng-content />

    <section>
      @for (item of list(); track $index) {
        <ng-container
          *ngTemplateOutlet="
            cardRowTemplate();
            context: { $implicit: item }
          "></ng-container>
      }
    </section>
    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addNewItemEvent.emit()">
      Add
    </button>
  `,
  standalone: true,
  imports: [NgTemplateOutlet],
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
})
export class CardComponent<TItem extends object> {
  public cardRowTemplate = contentChild.required(CardRowDirective, {
    read: TemplateRef,
  });

  public list = input<TItem[]>([]);
  public customClass = input<string>('');
  public addNewItemEvent = output<void>();
}
