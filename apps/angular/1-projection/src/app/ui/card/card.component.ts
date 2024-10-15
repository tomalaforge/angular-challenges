import {
  Component,
  ContentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { CardItemDirective } from './card-item.directive';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img"></ng-content>
    <section>
      @for (item of list(); track $index) {
        <ng-container
          [ngTemplateOutlet]="listItemTemplate"
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
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
})
export class CardComponent<T extends object> {
  list = input.required<T[]>();
  addItem = output();

  @ContentChild(CardItemDirective, { read: TemplateRef, descendants: true })
  listItemTemplate!: TemplateRef<unknown>;

  addNewItem() {
    this.addItem.emit();
  }
}
