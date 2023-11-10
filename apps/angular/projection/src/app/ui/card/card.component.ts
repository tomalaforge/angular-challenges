import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemTemplateDirective } from '../../directive/list-item-template.directive';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img"></ng-content>

    <section>
      <ng-container
        *ngFor="let item of list; trackBy: trackById"
        [ngTemplateOutlet]="listItemTemplate"
        [ngTemplateOutletContext]="{ $implicit: item }">
      </ng-container>
    </section>

    <button
      class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
      (click)="addNewItem()">
      Add
    </button>
  `,
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  standalone: true,
  imports: [NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent<
  ListItem extends { id: number },
  T extends { $implicit: ListItem }
> {
  @ContentChild(ListItemTemplateDirective, { read: TemplateRef })
  listItemTemplate!: TemplateRef<T>;

  @Input() list!: ListItem[];
  @Output() addItem = new EventEmitter<void>();

  addNewItem() {
    this.addItem.emit();
  }

  trackById(_index: number, item: ListItem) {
    return item.id;
  }
}
