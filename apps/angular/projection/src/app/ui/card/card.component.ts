import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content></ng-content>
      <section>
        @for (item of list; track $index) {
          <ng-container>
            <ng-template
              [ngTemplateOutlet]="itemTemplate"
              [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
          </ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="add.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, NgTemplateOutlet, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() customClass = '';
  @Output() add = new EventEmitter<void>();

  @ContentChild('listItem') itemTemplate!: TemplateRef<any>;
}
