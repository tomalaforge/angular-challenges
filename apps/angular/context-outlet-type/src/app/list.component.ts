import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  Input,
  TemplateRef,
} from '@angular/core';

interface ListContext<T> {
  $implicit: T;
  appList: T[];
  index: number;
}

@Directive({
  selector: 'ng-template[list]',
  standalone: true,
})
export class ListRefDirective<T> {
  @Input() list!: T[];

  static ngTemplateContextGuard<TContext>(
    dir: ListRefDirective<TContext>,
    ctx: unknown,
  ): ctx is ListContext<TContext> {
    return true;
  }
}

@Component({
  selector: 'list',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    @for (item of list; track $index) {
      <div>
        <ng-container
          *ngTemplateOutlet="
            listTemplateRef || emptyRef;
            context: { $implicit: item, appList: item, index: $index }
          "></ng-container>
      </div>
    }

    <ng-template #emptyRef>No Template</ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<TItem extends object> {
  @Input() list!: TItem[];

  @ContentChild(ListRefDirective, { read: TemplateRef })
  listTemplateRef!: TemplateRef<unknown>;
}
