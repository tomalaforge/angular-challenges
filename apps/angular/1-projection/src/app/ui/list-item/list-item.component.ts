import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      <ng-content select="[item-body]"></ng-content>
      <button (click)="delete()">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  @Output() deleteEventEmitter = new EventEmitter();
  constructor() {}

  delete() {
    this.deleteEventEmitter.emit();
  }
}
