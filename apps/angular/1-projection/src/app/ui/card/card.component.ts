import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img"></ng-content>
    <section>
      <app-list-item
        *ngFor="let item of list"
        [name]="item.firstName"
        [id]="item.id"
        (deleteItem)="deleteItem.emit($event)"></app-list-item>
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addItem.emit()">
      Add
    </button>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent],
})
export class CardComponent {
  @HostBinding('class') private classses =
    'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4';
  @Input() list: any[] | null = null;
  @Output() addItem = new EventEmitter<number>();
  @Output() deleteItem = new EventEmitter<number>();
}
