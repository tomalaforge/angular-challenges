import { NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <img [ngSrc]="cardImgSrc()" width="200" height="200" priority />
      <section>
        @for (item of list(); track item) {
          <app-list-item
            [name]="item.firstName"
            [id]="item.id"
            (delete)="delete.emit($event)"></app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem.emit()">
        Add
      </button>
    </div>
  `,
  imports: [ListItemComponent, NgOptimizedImage],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly cardImgSrc = input.required<string>();
  readonly customClass = input('');

  delete = output<number>();
  addNewItem = output<void>();
}
