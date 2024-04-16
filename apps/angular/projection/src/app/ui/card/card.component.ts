import { NgFor } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <div style="width: 200px;">
        <ng-content select="[image]"></ng-content>
      </div>
      <section>
        @for (item of list(); track item.id) {
          <app-list-item [name]="item.firstName || item.name" [id]="item.id">
            <button (click)="deleteItem.emit(item.id)" delete>
              <img class="h-5" src="assets/svg/trash.svg" />
            </button>
          </app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="this.addNewItem.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgFor, ListItemComponent],
})
export class CardComponent {
  list = input<any[] | null>(null);
  customClass = input('');

  protected addNewItem = output<void>();
  protected deleteItem = output<number>();
}
