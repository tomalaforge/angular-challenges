import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeleteService } from '../../data-access/delete-service';
import { CardModel } from '../../model/card-model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [style.background-color]="backGroundColor">
      <img [src]="iconPath" width="200px" />

      <section>
        <app-list-item
          *ngFor="let item of list"
          [name]="item.displayName"
          [id]="item.id"
          [deleteService]="deleteService"></app-list-item>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() list: CardModel[] | null = null;
  @Input() deleteService!: DeleteService;
  @Input() iconPath!: string;
  @Input() backGroundColor!: string;

  @Output() objectAdded = new EventEmitter<string>();

  constructor() {}

  addNewItem() {
    this.objectAdded.emit();
  }
}
