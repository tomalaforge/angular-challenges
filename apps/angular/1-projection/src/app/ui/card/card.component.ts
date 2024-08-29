import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <ng-content select="img"></ng-content>
      <section>
        @for (item of items(); track item.id) {
          <ng-template
            [ngTemplateOutlet]="rowTmp()"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="add.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T> {
  items = input.required<any[]>();
  rowTmp = input.required<TemplateRef<any>>();

  add = output<void>();
}
