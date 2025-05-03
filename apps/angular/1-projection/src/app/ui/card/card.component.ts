import { NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <img [ngSrc]="imgTitle()" width="200" height="200" priority />

      <section>
        @for (item of list(); track item) {
          <app-list-item
            (deleteEvent)="onDelete($event)"
            [name]="item.name"
            [id]="item.id" />
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  styles: [
    `
      .bg-color {
        background-color: var(--card-background);
      }
    `,
  ],
  imports: [NgOptimizedImage, ListItemComponent],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly type = input<CardType>();
  readonly customClass = input('');
  readonly imgTitle = input.required<string>();
  readonly addNew = output<void>();
  readonly itemId = output<number>();

  addNewItem() {
    this.addNew.emit();
  }

  onDelete(id: number) {
    this.itemId.emit(id);
  }
}
