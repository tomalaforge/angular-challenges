import {
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';

import { NgTemplateOutlet } from '@angular/common';
import { ListItemDirective } from '../list-item/list-item.directive';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="custom-bg flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <ng-content />
      <section>
        @for (item of list(); track item) {
          <ng-container
            [ngTemplateOutlet]="itemTemplate()"
            [ngTemplateOutletContext]="{ $implicit: item }" />
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem.emit()">
        Add
      </button>
    </div>
  `,
  styles: `
    .custom-bg {
      background: var(--card-bg-color);
    }
  `,
  imports: [NgTemplateOutlet],
})
export class CardComponent {
  itemTemplate = contentChild.required(ListItemDirective, {
    read: TemplateRef,
  });

  addNewItem = output();
  readonly list = input<any[] | null>(null);
}
