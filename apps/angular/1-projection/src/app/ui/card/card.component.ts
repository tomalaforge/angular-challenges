import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
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
          <app-list-item [id]="item.id" (delete)="delete.emit(item.id)">
            <ng-container
              *ngTemplateOutlet="
                nameTemplate() || defaultName;
                context: { $implicit: item }
              "></ng-container>
          </app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem.emit()">
        Add
      </button>

      <ng-template #defaultName let-item>
        <span class="name">{{ item.firstName }}</span>
      </ng-template>
    </div>
  `,
  imports: [ListItemComponent, NgOptimizedImage, NgTemplateOutlet],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly cardImgSrc = input.required<string>();
  readonly customClass = input('');

  nameTemplate = contentChild<TemplateRef<any>>('nameTemplate');
  delete = output<number>();
  addNewItem = output<void>();
}
