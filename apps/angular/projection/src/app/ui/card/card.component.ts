import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <img [src]="imageUrl" width="200px" />

      <section>
        <app-list-item
          *ngFor="let item of list"
          [name]="item.firstName || item.name"
          [id]="item.id"
          [type]="type"></app-list-item>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItemFunc()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() imageUrl: any;
  @Input() type!: CardType;
  @Input() customClass = '';
  @Output() addNewItem: EventEmitter<void> = new EventEmitter<void>();

  CardType = CardType;

  addNewItemFunc() {
    this.addNewItem.emit();
  }
}
