import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img" />

    <section>
      @for (item of list(); track item.id) {
        <ng-template
          [ngTemplateOutlet]="template()"
          [ngTemplateOutletContext]="{ $implicit: item }" />
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="add.emit()">
      Add
    </button>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
})
export class CardComponent<T extends { id: number }> {
  list = input.required<T[]>();

  add = output();

  template = contentChild.required('rowReference', { read: TemplateRef });
}
