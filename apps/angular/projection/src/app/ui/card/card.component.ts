import { JsonPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Directive({
  selector: '[listItemTemplateMarker]',
  standalone: true,
})
export class ListItemTemplateMarkerDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, NgTemplateOutlet, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'm-4 flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
})
export class CardComponent<T> {
  @Input() list: T[] | null = null;
  @Output() addNew = new EventEmitter();

  @ContentChild(ListItemTemplateMarkerDirective)
  row!: ListItemTemplateMarkerDirective;

  addNewItem() {
    this.addNew.emit();
  }
}
