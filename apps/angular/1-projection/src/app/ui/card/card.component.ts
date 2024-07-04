import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="image"></ng-content>
      <section>
        @for (item of list; track $index) {
          <ng-container
            *ngTemplateOutlet="
              listTemplate;
              context: { $implicit: item }
            "></ng-container>
        }
      </section>
      <ng-content select="addBtn"></ng-content>
    </div>
  `,
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() customClass = '';
  @Input() listTemplate: TemplateRef<any> | null = null;
}
