import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
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
      <ng-content select="[img-holder]"></ng-content>

      <section>
        @for (item of list; track item.id) {
          <ng-container
            [ngTemplateOutlet]="templateRef"
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
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() customClass = '';
  @Output() addItem: EventEmitter<any> = new EventEmitter();
  @ContentChild('card', { static: false }) templateRef!: TemplateRef<any>;

  addNewItem() {
    this.addItem.emit();
  }
}
