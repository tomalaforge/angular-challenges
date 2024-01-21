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
import { ListItemComponent } from '../list-item/list-item.component';

@Directive({
  selector: 'app-card-image',
  standalone: true,
})
export class CardImageDirective {}

@Directive({
  selector: '[appCardListItem]',
  standalone: true,
})
export class CardListItemDirective<T> {
  constructor(public templateRef: TemplateRef<{ $implicit: T }>) {}
}

@Component({
  selector: 'app-card',
  template: `
    <div class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <ng-content select="app-card-image"></ng-content>

      <section>
        @for (item of list; track $index) {
          <ng-template
            [ngTemplateOutlet]="rowTemplate.templateRef"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="actionClicked.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent<T> {
  @Input() list: T[] | null = null;
  @Output() actionClicked = new EventEmitter();
  @ContentChild(CardListItemDirective) rowTemplate!: CardListItemDirective<T>;
}
