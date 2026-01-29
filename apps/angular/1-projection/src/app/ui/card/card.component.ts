import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { CardItemDirective } from '../../card-item';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content></ng-content>

      <section>
        @for (item of list(); track item.id) {
          <ng-container
            *ngTemplateOutlet="
              itemTemplate();
              context: { $implicit: item }
            "></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="onAddClicked()">
        Add
      </button>
    </div>
  `,
  imports: [NgTemplateOutlet],
})
export class CardComponent {
  readonly list = input<any[]>();
  readonly itemTemplate = contentChild.required(CardItemDirective, {
    read: TemplateRef,
  });
  readonly customClass = input('');

  addClicked = output<void>();
  onAddClicked() {
    this.addClicked.emit();
  }
}
