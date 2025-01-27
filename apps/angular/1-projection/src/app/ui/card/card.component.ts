import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="[image]"></ng-content>
      <section>
        @for (item of list; track item) {
          <ng-container
            [ngTemplateOutlet]="listTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
        }
      </section>
      <ng-content select="[add-button]"></ng-content>
    </div>
  `,
  imports: [NgTemplateOutlet],
})
export class CardComponent<T> {
  @Input() list: T[] | null = null;
  @Input() customClass = '';
  @ContentChild('listTemplate') listTemplate!: TemplateRef<ListItemComponent>;
  constructor() {}
}
