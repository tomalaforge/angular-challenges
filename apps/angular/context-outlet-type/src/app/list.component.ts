import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  Input,
  TemplateRef,
} from '@angular/core';

interface ListTemplateContext<T> {
  appList: T;
  index: number;
}
@Directive({
  standalone: true,
  selector: 'ng-template[appList]',
})
export class ListTemplateDirective<T> {
  @Input('appList') list!: T[];

  static ngTemplateContextGuard<TContext>(
    directive: ListTemplateDirective<TContext>,
    context: unknown,
  ): context is ListTemplateContext<TContext> {
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
          context: { appList: item, index: i }
        ">
      </ng-container>
    </div>
    <ng-template #emptyRef> No Template </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<TItem extends object> {
  @Input() list!: TItem[];

  @ContentChild(ListTemplateDirective, { read: TemplateRef })
  listTemplateRef!: TemplateRef<ListTemplateContext<TItem>>;
}
