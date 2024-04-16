import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef, input, output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content></ng-content>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="clickedAdd.emit($event)">
        Add
      </button>

      <section>
        @for (item of list; track item.id) {
          <ng-container
            [ngTemplateOutlet]="itemTemplate()"
            [ngTemplateOutletContext]="{ $implicit: item }" />
        }
      </section>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, NgTemplateOutlet, ListItemComponent],
})
export class CardComponent<T extends { id: string | number }> {
  @Input() list: T[] | null = null;
  @Input() customClass = '';

  itemTemplate = input<TemplateRef<unknown> | null>(null);

  clickedAdd = output<MouseEvent>();
}
