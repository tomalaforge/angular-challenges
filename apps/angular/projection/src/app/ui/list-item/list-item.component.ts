import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border border-grey-300 py-1 px-2 flex justify-between">
      <ng-content select="[name]"></ng-content>
      <button (click)="delete.emit()">
        <img alt="delete-icon" class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  @Output() delete: EventEmitter<any> = new EventEmitter();
}
