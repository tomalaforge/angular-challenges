import { NgClass, NgFor, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [ngStyle]="{ 'background-color': backgroundColor() }"
      [ngClass]="customClass()">
      <div class="card__image">
        <ng-content select="[image]"></ng-content>
      </div>
      <section>
        @for (item of list(); track item.id) {
          <app-list-item [name]="item.firstName || item.name || ''">
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
  imports: [NgFor, ListItemComponent, NgStyle, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  list = input<{ id: number; firstName?: string; name?: string }[] | null>(
    null,
  );
  backgroundColor = input<string>('');
  customClass = input<string>('');

  protected addNewItem = output<void>();
  protected deleteItem = output<number>();
}
