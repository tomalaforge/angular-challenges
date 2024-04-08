import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Input,
  TemplateRef,
  contentChild,
  input,
  output,
} from '@angular/core';

interface ItemContext<T> {
  $implicit: T;
  item: T; // Required to support *options syntax as that does not use $implicit
}

@Directive({
  selector: 'ng-template[appItem]',
  standalone: true,
})
export class ItemDirective<T> {
  @Input({ required: true }) appItem!: T[];

  static ngTemplateContextGuard<TContext>(
    dir: ItemDirective<TContext>,
    ctx: unknown,
  ): ctx is ItemContext<TContext> {
    return true;
  }
}

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img"></ng-content>

    <section>
      @for (item of list(); track item.id) {
        <ng-template
          *ngTemplateOutlet="
            itemTemplateRef();
            context: { item, $implicit: item }
          "></ng-template>
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addItem.emit()">
      Add
    </button>
  `,
  standalone: true,
  imports: [NgTemplateOutlet, ItemDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
})
export class CardComponent<T extends { id: number }> {
  list = input<T[] | null>(null);
  addItem = output<void>();
  itemTemplateRef = contentChild.required(ItemDirective, { read: TemplateRef });
}
