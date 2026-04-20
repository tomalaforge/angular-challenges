import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="flex justify-between border border-gray-300 px-2 py-1">
      <ng-content />
      <button (click)="delete()">
        <img class="h-5" src="assets/svg/trash.svg" alt="trash" />
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  deleteEvent = output<void>();

  delete() {
    this.deleteEvent.emit();
  }
}
