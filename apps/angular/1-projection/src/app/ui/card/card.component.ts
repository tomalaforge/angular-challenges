import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black bg-[var(--background-color)] p-4"
      [style.--background-color]="backgroundColor()">
      <ng-content select="[head-img]" />

      <section>
        @for (item of list(); track item) {
          <ng-container
            *ngTemplateOutlet="itemTemplate(); context: { $implicit: item }" />
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NgTemplateOutlet],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly backgroundColor = input('');

  addEvent = output<void>();
  itemTemplate = contentChild<TemplateRef<any>>('itemContent');

  addNewItem() {
    this.addEvent.emit();
  }
}
