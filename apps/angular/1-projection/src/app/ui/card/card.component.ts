import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  Directive,
  input,
  output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img" />

    <section>
      @for (item of list(); track item.id) {
        <ng-container
          [ngTemplateOutlet]="listItem()"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addedNewItem.emit()">
      Add
    </button>
  `,
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  imports: [NgTemplateOutlet],
})
export class CardComponent<T extends { id: number }> {
  readonly list = input.required<T[]>();
  readonly addedNewItem = output<void>();

  protected readonly listItem = contentChild.required(CardListItemDirective, {
    read: TemplateRef,
  });
}

interface CardRowContext<T> {
  $implicit: T;
}

@Directive({
  selector: '[app-card-list-item]',
})
export class CardListItemDirective<T> {
  item = input.required<T[]>({ alias: 'app-card-list-item' });

  static ngTemplateContextGuard<TContext>(
    dir: CardListItemDirective<TContext>,
    ctx: unknown,
  ): ctx is CardRowContext<TContext> {
    return true;
  }
}
