import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { CardType } from '../../model/card.model';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="[card-header]"></ng-content>
      <section>
        @for (item of list; track item.id) {
          <ng-container
            *ngTemplateOutlet="
              templateRef;
              context: { $implicit: item }
            "></ng-container>
        }
      </section>
      <ng-content select="[card-footer]"></ng-content>
    </div>
  `,
  imports: [NgTemplateOutlet],
  standalone: true,
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';

  @Input() templateRef!: TemplateRef<any>;
  constructor() {}
}
