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
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="img"></ng-content>

      <section>
        <ng-container *ngFor="let item of list">
          <ng-template
            [ngTemplateOutlet]="rowTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        </ng-container>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="add.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, NgTemplateOutlet],
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
})
export class CardComponent<T> {
  @Input() list: T[] | null = null;
  @Input() customClass = '';
  @Output() add = new EventEmitter<void>();

  @ContentChild('rowRef', { read: TemplateRef }) rowTemplate!: TemplateRef<{
    $implicit: T;
  }>;
}
