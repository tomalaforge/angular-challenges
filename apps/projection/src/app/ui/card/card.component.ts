import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Item } from '../list-item/item';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div class="border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3">
      <img [src]="image" width="200px" />

      <section>
        <app-list-item
          *ngFor="let item of list"
          [item]="item"
          (delete)="delete.emit(item.id)">
        </app-list-item>
      </section>

      <button
        class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
        (click)="add.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() list: Item[] = [];
  @Input() customClass = '';
  @Input() image = '';
  @Output() delete = new EventEmitter<number>();
  @Output() add = new EventEmitter();
}
