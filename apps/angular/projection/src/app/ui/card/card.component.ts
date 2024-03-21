import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { ListItemRefDirective } from '../list-item/list-item.directive';
@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [ngStyle]="{ 'background-color': backgroundColor }">
      <ng-content select="img"></ng-content>
      <section>
        @for (item of list; track item.id) {
          <ng-container
            [ngTemplateOutlet]="deleteButton"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
        }
      </section>
      <ng-content select="button"></ng-content>
    </div>
  `,
  standalone: true,
  imports: [ListItemComponent, NgTemplateOutlet, NgStyle],
})
export class CardComponent {
  @Input() list: { id: number }[] | null = null;
  @Input() backgroundColor = '';
  @ContentChild(ListItemRefDirective, { read: TemplateRef })
  deleteButton!: TemplateRef<unknown>;
}
