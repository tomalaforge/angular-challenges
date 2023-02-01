import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Directive({ selector: 'card-image', standalone: true })
export class CardImageDirective {}
@Directive({ selector: 'ng-template[card-list]', standalone: true })
export class CardListDirective {}

@Component({
  selector: 'card',
  template: `
    <ng-content select="card-image"></ng-content>

    <section>
      <ng-container *ngFor="let item of list">
        <ng-template
          [ngTemplateOutlet]="cardList"
          [ngTemplateOutletContext]="{ $implicit: item }">
        </ng-template>
      </ng-container>
    </section>

    <button
      class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
      (click)="addItem.emit()">
      Add
    </button>
  `,
  standalone: true,
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  imports: [NgIf, NgFor, NgTemplateOutlet],
})
export class CardComponent<T> {
  @Input() list: T[] | null = null;
  @Output() addItem = new EventEmitter<void>();

  @ContentChild(CardListDirective, { read: TemplateRef })
  cardList!: TemplateRef<T>;
}
