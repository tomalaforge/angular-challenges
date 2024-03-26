import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <ng-content></ng-content>
    <button (click)="delete.next()">
      <img class="h-5" src="assets/svg/trash.svg" />
    </button>
  `,
  host: {
    class: 'border-grey-300 flex justify-between border px-2 py-1',
  },
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  @Output() delete = new EventEmitter<void>();
}
