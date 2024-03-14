import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [ngStyle]="{ 'background-color': customClass }">
      <ng-content select="img"></ng-content>
      <section>
        @for (item of list; track item.id) {
          <app-list-item [id]="item.id">
            <ng-container
              *ngTemplateOutlet="
                deleteButton;
                context: {
                  $implicit: item.id,
                  name: item.name,
                  firstName: item.firstName
                }
              "></ng-container>
          </app-list-item>
        }
      </section>
      <ng-content select="button"></ng-content>
    </div>
  `,
  standalone: true,
  imports: [ListItemComponent, NgTemplateOutlet, NgStyle],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() customClass = '';
  @ContentChild('deleteButton') deleteButton!: TemplateRef<any>;
}
