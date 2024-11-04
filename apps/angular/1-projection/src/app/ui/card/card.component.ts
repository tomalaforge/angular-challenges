import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  output,
} from '@angular/core';
import { ListItemTemplateDirective } from '../list-item/list-item-template.directive';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img" />

    <section>
      @for (item of list(); track item) {
        <ng-template
          [ngTemplateOutlet]="itemTemplate()?.templateRef ?? null"
          [ngTemplateOutletContext]="{ $implicit: item }" />
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addNewItem()">
      Add
    </button>
  `,
  standalone: true,
  imports: [ListItemComponent, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
})
export class CardComponent<T> {
  list = input<T[]>([]);

  itemTemplate = contentChild(ListItemTemplateDirective);

  add = output();

  addNewItem() {
    this.add.emit();
  }
}
