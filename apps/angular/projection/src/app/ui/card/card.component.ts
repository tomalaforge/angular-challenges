import { NgTemplateOutlet } from '@angular/common';
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
      <ng-content select="[img-src]"></ng-content>
      <section>
        @for (item of list; track item) {
          <ng-template
            [ngTemplateOutlet]="content.templateRef"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [ListItemComponent, NgTemplateOutlet],
})
export class CardComponent<T> {
  @Input() list: Array<T> | null = null;
  @Output() addOneEventEmitter = new EventEmitter<void>();
  @ContentChild(CardListItemDirective) content!: CardListItemDirective<T>;

  addNewItem() {
    this.addOneEventEmitter.emit();
  }
}
