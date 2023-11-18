import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border border-grey-300 py-1 px-2 flex justify-between">
      <ng-content />
      <button (click)="deleteAnItem()">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();

  public deleteAnItem(): void {
    this.delete.emit();
  }
}
