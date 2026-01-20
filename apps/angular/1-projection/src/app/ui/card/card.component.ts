import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img" />
    <section>
      @for (item of list(); track item) {
        <ng-container
          *ngTemplateOutlet="
            rowRef;
            context: { $implicit: item }
          "></ng-container>
      }
    </section>
    <ng-content />
  `,
  imports: [NgTemplateOutlet],
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4 ',
  },
})
export class CardComponent {
  @ContentChild('rowRef') rowRef!: TemplateRef<any>;
  readonly list = input<any[] | null>(null);
  readonly customClass = input('');
}
