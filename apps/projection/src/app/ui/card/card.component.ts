import {NgFor, NgIf, NgTemplateOutlet} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef
} from '@angular/core';
import {Entity} from '../../model/card.model';
import {ListItemComponent} from '../list-item/list-item.component';
import {ListItemTemplateDirective} from "../../directive/list-item-template.directive";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, NgTemplateOutlet],
  styles: [
    `
    :host {
      @apply border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3;
    }
    `,
    ],
})
export class CardComponent {
  @Input() list: Entity[] | null = null;
  @Input() customClass = '';

  @Output() add = new EventEmitter<void>();

  @ContentChild(ListItemTemplateDirective, {read: TemplateRef})
  listItemTemplate!: TemplateRef<ListItemComponent>;

  addNewItem() {
    this.add.emit();
  }

  id(index: number, item: Entity){
    return item.id;
  }
}