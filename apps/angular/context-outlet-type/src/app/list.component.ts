import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  contentChild,
  input,
} from '@angular/core';

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

  readonly listTemplateRef = contentChild.required('listRef', {
    read: TemplateRef,
  });
}
