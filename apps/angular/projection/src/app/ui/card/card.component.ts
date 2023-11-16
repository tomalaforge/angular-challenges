import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Directive({
  selector: 'ng-template [card-list-item]',
  standalone: true,
})
export class CardListItemDirective {}

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="[card-header]" />

    <section>
      <ng-template
        *ngFor="let item of list"
        [ngTemplateOutlet]="rowTemplate"
        [ngTemplateOutletContext]="{ $implicit: item }">
      </ng-template>
    </section>

    <button
      class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
      (click)="add.emit()">
      Add
    </button>
  `,
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent<T> {
  @Input() list: T[] | null = null;
  @Output() add = new EventEmitter<void>();
  @ContentChild(CardListItemDirective, { read: TemplateRef })
  rowTemplate!: TemplateRef<{ $implicit: T }>;
}
