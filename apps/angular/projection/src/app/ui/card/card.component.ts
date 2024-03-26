import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemRefDirective } from '../list-item/ListItemTemplateRef.directive';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <img [src]="imageUrl" width="200px" />
    <section>
      @for (item of list; track item.id) {
        <ng-template
          [ngTemplateOutlet]="listItemTemplateRef"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
      }
    </section>
    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addNewItemFunc()">
      Add
    </button>
  `,
  standalone: true,
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ListItemComponent, NgTemplateOutlet],
})
export class CardComponent<T extends { id: number }> {
  @Input() list: any[] | null = null;
  @Input() imageUrl: any;
  @Output() addNewItem: EventEmitter<void> = new EventEmitter<void>();

  @ContentChild(ListItemRefDirective, { read: TemplateRef })
  listItemTemplateRef!: TemplateRef<{ $implicit: T }>;

  addNewItemFunc() {
    this.addNewItem.emit();
  }
}
