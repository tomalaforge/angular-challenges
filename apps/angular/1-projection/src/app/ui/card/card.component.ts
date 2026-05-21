import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      style="background-color: var(--card-bg, transparent)"
      [class]="customClass()">
      <ng-content select="[card-header]"></ng-content>

      <section>
        @for (item of list(); track item) {
          <ng-container
            *ngTemplateOutlet="
              itemTemplate;
              context: { $implicit: item }
            "></ng-container>
        }
      </section>

      <ng-content select="[card-action]"></ng-content>
    </div>
  `,
  imports: [NgTemplateOutlet],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly customClass = input('');

  @ContentChild('itemTemplate') itemTemplate!: TemplateRef<any>;
}
