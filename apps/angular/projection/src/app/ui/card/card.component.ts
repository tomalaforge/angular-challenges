import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="[image]"></ng-content>
      <section>
        @for (item of list; track item) {
          <ng-container
            [ngTemplateOutlet]="ListItemTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [ListItemComponent, NgTemplateOutlet],
})
export class CardComponent<T> {
  @Input() list: T[] | null = null;
  @Input() customClass = '';
  @Output() AddNewRecordEmitter = new EventEmitter<null>();
  @ContentChild('itemTemplate') ListItemTemplate: TemplateRef<{
    $implicit: T;
  }> | null = null;

  addNewItem() {
    this.AddNewRecordEmitter.emit();
  }
}
