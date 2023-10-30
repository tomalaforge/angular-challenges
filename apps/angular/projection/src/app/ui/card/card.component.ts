import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { CardDirective } from './card.directive';

@Component({
  selector: 'app-card',
  template: ` <div>
    <ng-content select="[card-header]"></ng-content>
    <section>
      <ng-container
        *ngFor="let item of cardDirective.content"
        [ngTemplateOutlet]="cardDirective.templateRef"
        [ngTemplateOutletContext]="{ $implicit: item }">
      </ng-container>
    </section>
    <button
      class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
      (click)="this.addItem.emit()">
      Add
    </button>
  </div>`,
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  standalone: true,
  imports: [NgIf, NgFor, NgTemplateOutlet, ListItemComponent],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent<T extends object> {
  @Output() addItem = new EventEmitter<void>();
  @ContentChild(CardDirective) cardDirective!: CardDirective<T>;
}
