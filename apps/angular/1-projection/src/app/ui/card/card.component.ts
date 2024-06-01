import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  TemplateRef,
  input,
  output,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { RowItemDirective } from './row-item.directive';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img"></ng-content>
    <section>
      @for (item of list(); track item.id) {
        <ng-container
          *ngTemplateOutlet="
            rowItem;
            context: { $implicit: item }
          "></ng-container>
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addItem.emit()">
      Add
    </button>
  `,
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  standalone: true,
  imports: [NgTemplateOutlet, RowItemDirective, ListItemComponent],
})
export class CardComponent<T extends { id: number }> {
  @ContentChild(RowItemDirective, { read: TemplateRef }) rowItem!: TemplateRef<{
    $implicit: T;
  }>;
  list = input.required<T[]>();
  addItem = output();
}
