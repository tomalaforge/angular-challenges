import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-list-item',
  template: ` <div
    class="border border-grey-300 py-1 px-2 flex justify-between">
    <ng-content></ng-content>
    <button (click)="deleteItem()">
      <img class="h-5" src="assets/svg/trash.svg" />
    </button>
  </div>`,
  standalone: true,
  imports: [CommonModule],
})
export class ListItemComponent {
  @Output() deleteEvent = new EventEmitter<void>();
  deleteItem() {
    this.deleteEvent.emit();
  }
}
