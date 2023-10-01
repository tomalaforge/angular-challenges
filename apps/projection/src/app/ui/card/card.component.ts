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
      <ng-container *ngFor="let item of list">
        <ng-template
          *ngTemplateOutlet="row ?? empty; context: { $implicit: item }" />
        <ng-template #empty>
          <div>No template</div>
        </ng-template>
      </ng-container>
    </section>

    <button
      class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
      (click)="added.emit()">
      Add
    </button>
  `,
  standalone: true,
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  imports: [NgIf, NgFor, NgTemplateOutlet],
})
export class CardComponent<T> {
  @Input({ required: true }) list: T[] = [];
  @ContentChild(CardListItemDirective, { read: TemplateRef }) row: TemplateRef<{
    $implicit: T;
  }>;
  @Output() added = new EventEmitter<void>();
}
