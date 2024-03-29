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

interface HasId {
  id: string;
}

@Directive({
  selector: 'card-img',
  standalone: true,
})
export class CardImgDirective {}

@Directive({
  selector: '[rowRef]',
  standalone: true,
})
export class RowRefDirective {}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet, RowRefDirective],
})
export class CardComponent<T extends { id: number }> {
  @Input() list: T[] | null = null;
  @ContentChild(RowRefDirective, { read: TemplateRef })
  rowTemplate!: TemplateRef<{
    $implicit: T;
  }>;
  @Output() addItem = new EventEmitter<void>();
}
