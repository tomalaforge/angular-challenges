import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="[card-image]"></ng-content>

      <section>
        @for (item of list(); track item.id) {
          <ng-container
            *ngTemplateOutlet="
              itemTemplate();
              context: { $implicit: item }
            "></ng-container>
        }
      </section>

      <ng-content select="[card-actions]"></ng-content>
    </div>
  `,

  imports: [NgTemplateOutlet],
})
export class CardComponent {
  readonly list = input<any[]>([]);
  readonly customClass = input('');
  readonly trackByFn = input<(item: any) => any>((item) => item.id);

  readonly itemTemplate = contentChild.required<TemplateRef<any>>('listItem');
}
