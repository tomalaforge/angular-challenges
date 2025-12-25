import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, TemplateRef } from '@angular/core';
import { OptionTemplateDirective } from '../../directive/option-template.directive';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="card-image"></ng-content>
      <section>
        @for (item of list(); let i = $index; track i) {
          <ng-container
            [ngTemplateOutlet]="optionTemplateRef()"
            [ngTemplateOutletContext]="{
              $implicit: item,
              index: i
            }"></ng-container>
        }
      </section>
      <ng-content select="card-action"></ng-content>
    </div>
  `,
  imports: [NgTemplateOutlet],
})
export class CardComponent<T> {
  readonly list = input<T[]>();
  readonly customClass = input('');
  readonly optionTemplateRef = contentChild(OptionTemplateDirective, {
    read: TemplateRef,
  });
}
