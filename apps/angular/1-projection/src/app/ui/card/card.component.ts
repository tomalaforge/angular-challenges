import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [ngStyle]="customBgColor()"
      [style.background-color]="">
      <ng-content select="img"></ng-content>
      <section>
        @for (item of list(); track item.id) {
          <ng-container
            *ngTemplateOutlet="
              cardContent();
              context: { $implicit: item }
            "></ng-container>
        }
      </section>
      <ng-content select="button"></ng-content>
    </div>
  `,
  imports: [NgTemplateOutlet, NgStyle],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly cardContent = input<TemplateRef<any>>();
  readonly customBgColor = input<Record<string, string> | null>(null);
}
