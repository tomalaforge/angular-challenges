import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  input,
  Input,
  TemplateRef,
} from '@angular/core';
import { CardRowDirective } from './card-row.directive';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="image"></ng-content>
      <section>
        @for (item of list(); track $index) {
          <ng-template
            [ngTemplateOutlet]="rowTemplate()"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        }
      </section>
      <ng-content select="addBtn"></ng-content>
    </div>
  `,
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class CardComponent<T extends { id: number }> {
  list = input.required<T[]>();
  @Input() customClass = '';
  rowTemplate = contentChild.required(CardRowDirective, { read: TemplateRef });
}
