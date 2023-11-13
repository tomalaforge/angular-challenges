import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  Input,
  TemplateRef,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[listItemTemplate]',
})
export class ListItemTemplateDirective<T> {
  @Input() listItemTemplate!: T[];

  static ngTemplateContextGuard<T>(
    _directive: ListItemTemplateDirective<T>,
    _context: unknown
  ): _context is ListItemContext<T> {
    return true;
  }
}

interface ListItemContext<T> {
  $implicit: T[];
  listItem: T;
  index: number;
}

@Component({
  selector: 'list',
  standalone: true,
  imports: [CommonModule, ListItemTemplateDirective],
  template: `
    <div *ngFor="let item of list; index as i">
      <ng-container
        *ngTemplateOutlet="
          listItemTemplateRef || emptyRef;
          context: { $implicit: list, listItem: item, index: i }
        ">
      </ng-container>
    </div>

    <ng-template #emptyRef> No Template </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<TItem extends object> {
  @Input() list!: TItem[];

  @ContentChild(ListItemTemplateDirective, { read: TemplateRef })
  listItemTemplateRef!: TemplateRef<ListItemContext<TItem>>;
}
