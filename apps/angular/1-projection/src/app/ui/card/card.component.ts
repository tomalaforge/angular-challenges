import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  output,
} from '@angular/core';
import { CardItemDirective } from './card-item.directive';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="[card-image]" />

      <section>
        @for (item of list(); track $index) {
          <ng-container
            [ngTemplateOutlet]="itemTemplate().templateRef"
            [ngTemplateOutletContext]="{ $implicit: item }" />
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="add.emit()">
        Add
      </button>
    </div>
  `,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T> {
  readonly list = input<readonly T[]>([]);
  readonly customClass = input('');

  protected itemTemplate = contentChild.required(CardItemDirective);

  add = output<void>();
}
