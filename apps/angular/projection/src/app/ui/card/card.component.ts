import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { BaseEntity } from '../../model/base-entity.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() list: BaseEntity[] = [];
  @Input() customClass = '';
  @Input() imageSrc!: string;
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() addItemEvent = new EventEmitter<void>();

  delete(id: number) {
    this.deleteEvent.emit(id);
  }

  addItem() {
    this.addItemEvent.emit();
  }
}
