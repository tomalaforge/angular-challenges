import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div
      class="border-grey-300 bg-light-green flex justify-between border px-2 py-1">
      <ng-content></ng-content>
      <button (click)="delete.next()">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
})
export class ListItemComponent {
  @Output() delete = new EventEmitter<void>();
}
