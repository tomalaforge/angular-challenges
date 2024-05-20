import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  TemplateRef,
  input,
} from '@angular/core';
import { ListTemplateContext } from '../core/list.directive';

@Component({
  selector: 'list',
  standalone: true,
  imports: [CommonModule],
  template: `
    @for (item of list(); track $index) {
      <ng-container
        *ngTemplateOutlet="
          listTemplateRef || emptyRef;
          context: { $implicit: item, index: $index }
        "></ng-container>
      <ng-template #emptyRef>No Template</ng-template>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<TItem extends object> {
  list = input.required<TItem[]>();

  @ContentChild('listRef', { read: TemplateRef })
  listTemplateRef!: TemplateRef<ListTemplateContext<TItem>>; //by providing the generic type 'ListTemplateContext' instead of unknown, context is strongly typed
}
