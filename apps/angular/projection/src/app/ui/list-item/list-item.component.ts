import { NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border border-grey-300 py-1 px-2 flex justify-between">
      <ng-content></ng-content>
      <button (click)="deleteItemClicked.next()">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class ListItemComponent {
  @Output() deleteItemClicked = new EventEmitter<void>();
}
