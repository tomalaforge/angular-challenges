import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: 'list-item.component.html',
  standalone: true,
})
export class ListItemComponent {
  @Input() name!: string;
  @Output() delete = new EventEmitter();

  deleteEmit() {
    this.delete.emit();
  }
}
