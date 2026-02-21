import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  Directive,
  input,
  Signal,
  TemplateRef,
} from '@angular/core';

interface ListContext<T> {
  readonly $implicit: T;
  // added list property only to match it with sugar syntax (which I don't like)
  readonly list: T;
  readonly index: number;
}

@Directive({
  selector: 'ng-template[list]',
})
export class ListDirective<T> {
  readonly list = input.required<T[]>();

  static ngTemplateContextGuard<T>(
    dir: ListDirective<T>,
    ctx: unknown,
  ): ctx is ListContext<T> {
    return true;
  }
}

@Component({
  selector: 'list',
  template: `
    @for (item of list(); track $index) {
      <ng-container
        *ngTemplateOutlet="
          listTemplateRef() || emptyRef;
          context: { $implicit: item, list: item, index: $index }
        " />
    }

    <ng-template #emptyRef>No Template</ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
})
export class ListComponent<T> {
  readonly list = input.required<T[]>();

  // if required -> emptyRef becomes dead code
  protected readonly listTemplateRef: Signal<
    TemplateRef<ListContext<T>> | undefined
  > = contentChild(ListDirective, { read: TemplateRef });
}
