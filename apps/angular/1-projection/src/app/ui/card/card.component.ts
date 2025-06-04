import { NgTemplateOutlet } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="[appCardHeader]"></ng-content>

      <section>
        @for (item of list(); track $index) {
          <ng-container
            [ngTemplateOutlet]="itemTpl()"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
        }
      </section>

      <ng-content select="[appCardActions]"></ng-content>
    </div>
  `,
  imports: [NgTemplateOutlet],
  standalone: true,
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly customClass = input('');
  readonly itemTpl = input.required<TemplateRef<any>>();
}
