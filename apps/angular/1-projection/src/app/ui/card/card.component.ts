import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="card flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <ng-container [ngTemplateOutlet]="imgTemplate"></ng-container>

      <section>
        @for (item of list; track $index) {
          <ng-container>
            <ng-container
              [ngTemplateOutlet]="itemTemplate"
              [ngTemplateOutletContext]="{ $implicit: item }"
              ]></ng-container>
          </ng-container>
        }
      </section>

      <ng-container [ngTemplateOutlet]="actionTemplate"></ng-container>
    </div>
  `,
  standalone: true,
  styles: [
    `
      .card {
        background-color: var(--bgColor);
      }
    `,
  ],
  imports: [NgIf, NgFor, CommonModule, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() imgTemplate!: TemplateRef<any>;
  @Input() itemTemplate!: TemplateRef<any>;
  @Input() actionTemplate!: TemplateRef<any>;
}
