import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img"></ng-content>
    <section>
      @for (item of list; track item.id) {
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
  standalone: true,
  imports: [NgTemplateOutlet, ListItemComponent],
})
export class CardComponent<T extends { id: number }> {
  @HostBinding('class') private classses =
    'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4';
  @ContentChild('rowItem') rowItem!: TemplateRef<{ $implicit: T }>;
  @Input() list: T[] | null = null;
  @Output() addItem = new EventEmitter<number>();
}
