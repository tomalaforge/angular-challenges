import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, input, TemplateRef } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="card-img"></ng-content>

      <section>
        @for (item of list(); track item) {
          <ng-container
            [ngTemplateOutlet]="listTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
        }
      </section>

      <ng-content select="add-button"></ng-content>
    </div>
  `,
  imports: [NgTemplateOutlet, ListItemComponent],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly customClass = input('');
  @ContentChild('listTemplate') listTemplate!: TemplateRef<ListItemComponent>;
}
