import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input } from '@angular/core';
import { TemplateDirective } from '../template-directive/template.directive';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="card flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <ng-content select="[appCardImg]"></ng-content>

      <section>
        @for (item of list(); track item) {
          <ng-container
            *ngTemplateOutlet="
              itemTemplate()?.templateRef || null;
              context: { $implicit: item }
            "></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addItemFn()()">
        Add
      </button>
    </div>
  `,
  styles: [
    `
      .card {
        background-color: var(--card-background-color);
      }
    `,
  ],
  imports: [NgTemplateOutlet],
})
export class CardComponent<T> {
  readonly list = input<T[] | null>(null);
  readonly addItemFn = input.required<() => void>();
  protected itemTemplate = contentChild(TemplateDirective);
}
