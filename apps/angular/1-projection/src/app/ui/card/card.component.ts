import { NgTemplateOutlet } from '@angular/common';
import { Component, input, output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [style.background-color]="customClass()">
      <ng-content select="img" />

      <section>
        @for (item of list(); track item.id) {
          <ng-container
            [ngTemplateOutlet]="templateRef()"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="add.emit()">
        Add
      </button>
    </div>
  `,
  imports: [NgTemplateOutlet],
})
export class CardComponent {
  list = input<{ id: number }[] | null>(null);
  customClass = input<string>('');
  templateRef = input.required<TemplateRef<any>>();

  add = output<void>();
}
