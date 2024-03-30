import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  TemplateRef,
  input,
  output,
} from '@angular/core';
import { ListItemDirective } from '../list-item/list-item-directive';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img"></ng-content>
    @for (item of list(); track item.id) {
      <ng-template
        [ngTemplateOutlet]="listItemTemplate"
        [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
    } @empty {
      <div>It does not exist items</div>
    }
    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="add.emit()">
      Add
    </button>
  `,
  standalone: true,
  host: {
    class: 'border-2 border-black rounded-md p-4 flex flex-col gap-3',
  },
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T extends { id: number }> {
  list = input<T[] | null>(null);
  image = input<string | null>(null);
  add = output<void>();
  @ContentChild(ListItemDirective, { read: TemplateRef })
  listItemTemplate!: TemplateRef<{ $implicit: T }>;
}
