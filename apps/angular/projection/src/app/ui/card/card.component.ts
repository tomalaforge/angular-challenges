import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  Directive,
  Input,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Directive({
  selector: '[cardListItem]',
  standalone: true,
})
export class CardListItemDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="[image]"></ng-content>

      <section>
        @for (item of list; track $index) {
          <ng-container
            [ngTemplateOutlet]="content.templateRef"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
        }
      </section>

      <ng-content></ng-content>
    </div>
  `,

  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent<T> {
  @Input() list: T[] | null = null;
  @Input() customClass = '';

  @ContentChild(CardListItemDirective) content!: CardListItemDirective;
}
