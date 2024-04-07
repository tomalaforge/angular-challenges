import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  TemplateRef,
  contentChild,
  input,
  output,
} from '@angular/core';
import { ListItemTemplateDirective } from '../../directive/list-item-template.directive';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <img [ngSrc]="headerImageUrl()" width="200" height="200" priority />

      <section>
        @for (item of list(); track item.id) {
          @if (itemTemplateRef(); as itemTemplateRef) {
            <ng-template
              [ngTemplateOutlet]="itemTemplateRef"
              [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
          }
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="onAddNewItem.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [ListItemComponent, NgTemplateOutlet, NgOptimizedImage],
})
export class CardComponent<T extends { id: number }> {
  list = input<T[] | null>(null);
  headerImageUrl = input.required<string>();
  customClass = input('');
  onAddNewItem = output();

  itemTemplateRef = contentChild.required(ListItemTemplateDirective, {
    read: TemplateRef,
  });
}
