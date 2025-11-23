import { CommonModule, NgOptimizedImage } from '@angular/common';
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
      [class]="customClass()">
      <img *ngIf="image()" [ngSrc]="image()!" width="200" height="200" />

      <section>
        @for (item of list(); track item.id) {
          <app-list-item
            [label]="item.label"
            [id]="item.id"
            (delete)="delete.emit($event)"></app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="add.emit()">
        Add
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ListItemComponent, NgOptimizedImage, CommonModule],
})
export class CardComponent {
  // ожидаем входы через helper `input` (Angular signals-style)
  readonly list = input.required<any[]>(); // сигнал с массивом элементов
  readonly image = input<string | null>(null);
  readonly customClass = input<string>('');

  // выходы
  readonly add = output<void>();
  readonly delete = output<number>();
}
