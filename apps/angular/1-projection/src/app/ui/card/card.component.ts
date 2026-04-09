import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  Directive,
  input,
  output,
  TemplateRef,
} from '@angular/core';

@Directive({
  selector: 'ng-template[cardItem]',
  standalone: true,
})
export class CardItemDirective {}

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="[card-image]" />

      <section>
        <section>
          @for (item of list(); track item) {
            <ng-container
              *ngTemplateOutlet="
                itemTemplate();
                context: { $implicit: item }
              "></ng-container>
          }
        </section>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  imports: [NgTemplateOutlet],
})
export class CardComponent<T> {
  readonly list = input<T[]>([]);
  readonly customClass = input('');
  readonly added = output();
  readonly deleted = output<number>();
  readonly itemTemplate = contentChild.required(CardItemDirective, {
    read: TemplateRef,
  });

  addNewItem() {
    this.added.emit();
  }

  deleteItem(event: number) {
    this.deleted.emit(event);
  }
}
