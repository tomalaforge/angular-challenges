import { CommonModule } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';
import { BaseItem } from '../../model/base.model';
@Component({
  selector: 'app-card',
  template: `
    <div
      class="card flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <div class="card-header">
        <ng-content select="[cardSection='header']"></ng-content>
      </div>

      <div class="card-body">
        @for (item of list(); track item.id) {
          <ng-container
            [ngTemplateOutlet]="cardItemTemplate()"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
        }
      </div>

      <div class="card-footer">
        <ng-content select="[cardSection='footer']"></ng-content>
      </div>
    </div>
  `,
  imports: [CommonModule],
})
export class CardComponent<T extends BaseItem> {
  readonly list = input<T[] | null>(null);
  readonly customClass = input('');
  readonly cardItemTemplate = input.required<TemplateRef<any>>();
}
