import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { CardItem } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

interface CardContentCtx<T> {
  $implicit: T;
}

@Directive({
  selector: '[card-content]',
  standalone: true,
})
export class CardContentDirective<T> {
  constructor(public templateRef: TemplateRef<CardContentCtx<T>>) {}
}

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="[card-img]"></ng-content>

    <section>
      @for (item of items; track item.id) {
        <ng-container
          [ngTemplateOutlet]="listItemTemplate.templateRef"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
      } @empty {
        <p>There are no items.</p>
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="add.emit()">
      Add
    </button>
  `,
  styles: [':host { display: block; } .card-img { width: 200px; }'],
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  standalone: true,
  imports: [NgFor, NgTemplateOutlet, ListItemComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T extends CardItem> {
  @Input() items: T[] | null = null;

  @Output() add = new EventEmitter<void>();

  @ContentChild(CardContentDirective)
  listItemTemplate!: CardContentDirective<T>;
}

@Directive({
  selector: '[card-img]',
  host: { class: 'card-img' },
  standalone: true,
})
export class CardImageDirective {}
