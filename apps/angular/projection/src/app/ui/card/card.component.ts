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
  templateUrl: './card.component.html',
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
