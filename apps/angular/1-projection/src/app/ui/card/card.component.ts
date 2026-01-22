import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <ng-template #card let-cardTypeVal="cardType">
      <div
        class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
        [class]="customClass()">
        <img
          ngSrc="assets/img/{{ CardType[cardTypeVal()].toLowerCase() }}.{{
            this.pictureType()
          }}"
          width="200"
          height="200"
          priority />
        <section>
          @for (item of list(); track item) {
            <app-list-item
              [name]="item.name"
              [firstName]="item.firstName"
              [lastName]="item.lastName"
              [id]="item.id"
              [type]="type()"
              (deleteItem)="delete($event)" />
          }
        </section>

        <button
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          (click)="addItem.emit()">
          Add
        </button>
      </div>
    </ng-template>

    <ng-container *ngTemplateOutlet="card; context: ctx"></ng-container>
  `,
  imports: [ListItemComponent, NgOptimizedImage, NgTemplateOutlet],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly type = input.required<CardType>();
  readonly customClass = input('');
  readonly pictureType = input.required<string>();
  addItem = output<void>();
  deleteItem = output<number>();
  readonly ctx = { cardType: this.type };
  CardType = CardType;

  delete(id: number) {
    this.deleteItem.emit(id);
  }
}
