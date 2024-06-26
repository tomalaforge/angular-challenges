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
import { ListItem } from '../list-item/list-item.directive';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="img"></ng-content>
      @for (item of list; track item.id) {
        <ng-template
          [ngTemplateOutlet]="rowTemplate"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
      }
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="onAddItem()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent<T extends { id: number }> {
  @ContentChild(ListItem, { read: TemplateRef })
  rowTemplate!: TemplateRef<{ $implicit: T }>;
  @Input() list: T[] | null = null;
  @Input() customClass = '';
  @Output() addItem: EventEmitter<void> = new EventEmitter<void>();

  onAddItem() {
    this.addItem.emit();
  }
}
