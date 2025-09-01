import { CommonModule } from '@angular/common';
import {
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { ListItemTemplateDirective } from '../list-item/list-item-template.directive';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="img"></ng-content>

      <section>
        @for (item of list(); track item) {
          <ng-template
            [ngTemplateOutlet]="listItemTemplate()"
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
  imports: [CommonModule],
})
export class CardComponent<T> {
  readonly list = input<T[]>();
  add = output<void>();

  readonly customClass = input('');

  readonly listItemTemplate = contentChild.required(ListItemTemplateDirective, {
    read: TemplateRef,
  });
}
