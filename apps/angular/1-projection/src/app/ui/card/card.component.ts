import { CommonModule } from '@angular/common';
import { Component, ContentChild, input, TemplateRef } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="image" />

      <section>
        @for (item of list(); track item.id) {
          <app-list-item>
            <ng-container
              [ngTemplateOutlet]="templateRef"
              [ngTemplateOutletContext]="{ $implicit: item }"
              ngProjectAs="userslist"></ng-container>
          </app-list-item>
        }
      </section>

      <ng-content select="add" />
    </div>
  `,
  imports: [ListItemComponent, CommonModule],
})
export class CardComponent {
  list = input<any[] | null>(null);
  customClass = input('');
  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;
}
