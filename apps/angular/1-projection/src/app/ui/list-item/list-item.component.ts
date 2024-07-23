import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardType } from '../../model/card.model';

@Component({
  selector: 'app-list-item',
  templateUrl: 'list-item.component.html',
  standalone: true,
})
export class ListItemComponent {
  @Input() id!: number;
  @Input() name!: string;
  @Input() type!: CardType;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  @Input() callback!: () => void;

  deleteEmit() {
    this.delete.emit();
  }
}
