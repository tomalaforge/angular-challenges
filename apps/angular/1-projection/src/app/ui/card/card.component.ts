import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
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
    <ng-content select="img"></ng-content>

    <section>
      @for (item of items; track item.id) {
        <ng-template
          [ngTemplateOutlet]="rowTemplate"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
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
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T extends { id: number }> {
  @Input({ required: true }) items: T[] = [];
  @Input() customClass = '';
  @Output() addItem = new EventEmitter();

  @ContentChild('rowRef', { read: TemplateRef }) rowTemplate!: TemplateRef<{
    $implicit: T;
  }>;
}
