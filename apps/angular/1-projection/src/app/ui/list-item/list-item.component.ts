import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      <ng-container
        *ngTemplateOutlet="
          itemTemplate;
          context: { data: item }
        "></ng-container>
      <button (click)="deleteItem()">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class ListItemComponent {
  @Input() itemTemplate: TemplateRef<any> | null = null;
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-empty-function
  @Input() deleteItem: Function = function () {};
  @Input() item: any;
}
