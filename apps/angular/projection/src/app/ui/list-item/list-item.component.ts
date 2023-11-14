import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content />
    <button (click)="delete.emit()">
      <img class="h-5" src="assets/svg/trash.svg" />
    </button>
  `,
  host: {
    class: 'border border-grey-300 py-1 px-2 flex justify-between',
  },
})
export class ListItemComponent {
  @Output() delete = new EventEmitter<void>();
}
