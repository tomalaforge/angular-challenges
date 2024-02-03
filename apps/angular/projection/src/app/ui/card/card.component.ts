import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="card-image"></ng-content>
      <section>
        @for (item of list; track item.id) {
          <app-list-item [name]="item.firstName" [type]="type">
            <button ngProjectAs="list-button" (click)="deleteItem(item.id)">
              <img class="h-5" src="assets/svg/trash.svg" />
            </button>
          </app-list-item>
        }
      </section>
      <ng-content select="card-button"></ng-content>
    </div>
  `,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }

      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';
  @Output() deleteItemEvent = new EventEmitter<number>();

  CardType = CardType;

  deleteItem(id: number) {
    this.deleteItemEvent.emit(id);
  }
}
