import { CommonModule } from '@angular/common';
import { Component, input, output, type TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="card-image" />

      <section>
        @for (item of list(); track item) {
          <ng-container
            [ngTemplateOutlet]="templateType()"
            [ngTemplateOutletContext]="{ $implicit: item }" />
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
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly templateType = input.required<TemplateRef<any>>();
  readonly customClass = input('');
  readonly itemAdded = output<void>();

  addNewItem() {
    this.itemAdded.emit();
  }
}
