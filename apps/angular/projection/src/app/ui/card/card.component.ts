import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CardBgColorDirective } from '../../directive/card-background-color.directive';
import { CardImageTemplateDirective } from '../../directive/card-image-template.directive';
import { ListItemTemplateDirective } from '../../directive/list-item-template-directive';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [cardBgColor]="bgColor">
      <ng-container
        [ngTemplateOutlet]="
          cardImageTemplate?.templateRef ?? null
        "></ng-container>

      <section>
        <ng-container
          *ngFor="let item of list"
          [ngTemplateOutlet]="listItemTemplate?.templateRef ?? null"
          [ngTemplateOutletContext]="{
            $implicit: item
          }"></ng-container>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgTemplateOutlet,
    ListItemComponent,
    CardBgColorDirective,
  ],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() bgColor = 'rgba(0,0,0,0)';

  @Output() addNewItem = new EventEmitter<void>();

  @ContentChild(CardImageTemplateDirective)
  cardImageTemplate?: CardImageTemplateDirective;
  @ContentChild(ListItemTemplateDirective)
  listItemTemplate?: ListItemTemplateDirective;
}
