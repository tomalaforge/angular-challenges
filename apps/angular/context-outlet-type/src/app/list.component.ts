import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  TemplateRef,
  contentChild,
  input,
} from '@angular/core';

interface Context<T> {
  $implicit: T;
  appList: T;
  index: number;
}

@Directive({
  standalone: true,
  selector: 'ng-template[appList]',
})
export class ListDirective<T> {
  appList = input.required<T[]>();

  static ngTemplateContextGuard<TC>(
    dir: ListDirective<TC>,
    ctx: unknown,
  ): ctx is Context<TC> {
    return true;
  }
}

@Component({
  selector: 'list',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    @for (item of list(); track $index) {
      <div>
        <ng-container
          *ngTemplateOutlet="
            listTemplateRef() || emptyRef;
            context: { $implicit: item, appList: item, index: $index }
          " />
      </div>
    }

    <ng-template #emptyRef>No Template</ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<TItem extends object> {
  list = input.required<TItem[]>();

  readonly listTemplateRef = contentChild.required(ListDirective<TItem>, {
    read: TemplateRef,
  });
}
