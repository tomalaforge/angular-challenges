import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="[card-image]"></ng-content>
      <section class="card-content">
        <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
      </section>
      <ng-content select="[card-button]"></ng-content>
    </div>
  `,
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class CardComponent {
  @Input() customClass = '';
  @Input() contentTemplate!: TemplateRef<any>;

  constructor() {}
}
