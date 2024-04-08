import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img"></ng-content>

    <section>
      @for (item of list(); track item.id) {
        <ng-template
          *ngTemplateOutlet="
            itemTemplateRef();
            context: { $implicit: item }
          "></ng-template>
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addItem.emit()">
      Add
    </button>
  `,
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
})
export class CardComponent {
  list = input<any[] | null>(null);
  addItem = output<void>();
  itemTemplateRef = contentChild<any>('itemRef');
}
