import { NgTemplateOutlet } from '@angular/common';
import { Component, input, output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img"></ng-content>

    <section>
      @for (item of list(); track item) {
        <ng-container
          [ngTemplateOutlet]="itemTemplate()"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addNewItem()">
      Add
    </button>
  `,
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  imports: [NgTemplateOutlet],
})
export class CardComponent<T> {
  readonly list = input<T[] | null>(null);
  readonly itemTemplate = input<TemplateRef<any> | null>(null);
  onAddNewItem = output();

  addNewItem() {
    this.onAddNewItem.emit();
  }
}
