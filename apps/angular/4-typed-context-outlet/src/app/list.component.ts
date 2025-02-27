import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';

interface ListContext<T> {
  $implicit: T;
  index: number;
}

@Component({
  selector: 'list',
  imports: [CommonModule],
  template: `
    <div *ngFor="let item of list; index as i">
      <ng-container
        *ngTemplateOutlet="
          listTemplateRef || emptyRef;
          context: { $implicit: item, index: i }
        "></ng-container>
    </div>

    <ng-template #emptyRef>No Template</ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ListComponent<TItem extends object> {
  @Input() list!: TItem[];

  @ContentChild('listRef', { read: TemplateRef })
  listTemplateRef!: TemplateRef<ListContext<TItem>>;

  static ngTemplateContextGuard<T extends object>(
    dir: ListComponent<T>,
    ctx: unknown,
  ): ctx is ListContext<T> {
    return true;
  }
}
