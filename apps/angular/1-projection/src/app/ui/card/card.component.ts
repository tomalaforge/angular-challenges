import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="img"></ng-content>

      <section>
        @for (item of items(); track item.id) {
          <ng-template
            [ngTemplateOutlet]="listTemplate()!"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="additems.emit()">
        Add
      </button>
    </div>
  `,
  imports: [NgTemplateOutlet],
})
export class CardComponent {
  readonly items = input.required<any[]>();
  readonly customClass = input.required();

  readonly additems = output();

  readonly listTemplate = contentChild('listTemplate', { read: TemplateRef });
}
