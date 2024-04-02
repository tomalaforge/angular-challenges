import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardType } from '../../model/card.model';
import { CardService } from '../../services/card.service';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <img
        *ngIf="type === CardType.TEACHER"
        src="assets/img/teacher.png"
        width="200px" />
      <img
        *ngIf="type === CardType.STUDENT"
        src="assets/img/student.webp"
        width="200px" />

      <img
        *ngIf="type === CardType.CITY"
        src="assets/img/city.png"
        width="200px" />

      <section>
        <app-list-item
          *ngFor="let item of list"
          [name]="item.firstName ?? item.name"
          [id]="item.id"
          [type]="type"></app-list-item>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() list!: any[];
  @Input() type!: CardType;
  @Input() customClass = '';

  CardType = CardType;

  constructor(private cardService: CardService) {}

  addNewItem() {
    this.cardService.addOne(this.type);
  }
}
