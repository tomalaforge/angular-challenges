import { CommonModule } from '@angular/common';
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
  appList: T;
  index: number;
}

@Directive({
  selector: 'ng-template[appList]',
  standalone: true,
})
export class ListDirective<T> {
  @Input({ required: true }) appList!: T[];

  static ngTemplateContextGuard<TContext>(
    dir: ListDirective<TContext>,
    ctx: unknown,
  ): ctx is ListContext<TContext> {
    return true;
  }
}

@Component({
  selector: 'list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let item of list; index as i">
      <ng-container
        *ngTemplateOutlet="
          listTemplateRef || emptyRef;
          context: { $implicit: item, appList: item, index: i }
        "></ng-container>
    </div>

    <ng-template #emptyRef>No Template</ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<TItem extends object> {
  @Input() list!: TItem[];

  @ContentChild(ListDirective, { read: TemplateRef })
  listTemplateRef!: TemplateRef<unknown>;
}
