import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'list',
  template: `
    @for (item of list(); track $index) {
      <ng-container
        *ngTemplateOutlet="
          listTemplateRef() || emptyRef;
          context: { $implicit: item, appList: item, index: $index }
        " />
    }

    <ng-template #emptyRef>No Template</ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
})
export class ListComponent<TItem extends object> {
  list = input.required<TItem[]>();

  listTemplateRef = contentChild('listRef', { read: TemplateRef });
}
