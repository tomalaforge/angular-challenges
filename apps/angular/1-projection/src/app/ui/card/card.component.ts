import { CommonModule } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';
import { Item } from '../../model/item.model';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <div class="card-header">
        <ng-content select="[sectionCard='header']"></ng-content>
      </div>

      <div class="card-body">
        @for (item of list(); track item.id) {
          <ng-container
            [ngTemplateOutlet]="itemTemplate()"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
        }
      </div>

      <div class="card-footer">
        <ng-content select="[sectionCard='footer']"></ng-content>
      </div>
    </div>
  `,
  imports: [CommonModule],
})
export class CardComponent<T extends Item> {
  readonly list = input<T[] | null>(null);
  readonly customClass = input('');
  readonly itemTemplate = input.required<TemplateRef<any>>();
}
