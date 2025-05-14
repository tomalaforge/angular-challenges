import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="img"></ng-content>
      <section>
        @for (item of list(); track item) {
          <ng-container
            [ngTemplateOutlet]="rowTemplate"
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
  imports: [CommonModule],
})
export class CardComponent<T> {
  readonly list = input<T[] | null>(null);
  readonly customClass = input('');
  readonly addListItem = output();

  @ContentChild('rowRef', { read: TemplateRef })
  rowTemplate!: TemplateRef<{ $implicit: T }>;

  addNewItem() {
    this.addListItem.emit();
  }
}
