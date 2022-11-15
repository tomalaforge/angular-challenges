import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  standalone: true,
  host: {
    class: 'border border-grey-300 py-1 px-2 flex justify-between',
  },
})
export class ListItemComponent {
  @Output()
  delete = new EventEmitter<void>();
}
