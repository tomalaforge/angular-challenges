import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <ng-content [select]="'img'"></ng-content>
    <section>
      @for (item of list; track item.id) {
        <ng-container
          [ngTemplateOutlet]="itemRef"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="add.emit()">
      Add
    </button>
  `,
  standalone: true,
  imports: [NgIf, NgFor, NgTemplateOutlet],
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
})
export class CardComponent<T extends { id: number }> {
  @Input() list: T[] | null = null;
  @ContentChild('itemRef', { read: TemplateRef }) itemRef!: TemplateRef<{
    $implicit: T;
  }>;

  @Output() add: EventEmitter<void> = new EventEmitter();

  constructor() {}
}
