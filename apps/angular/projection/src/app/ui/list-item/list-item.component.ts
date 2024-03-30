import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <ng-content></ng-content>
    <button (click)="delete.emit()">
      <img class="h-5" src="assets/svg/trash.svg" alt="" />
    </button>
  `,
  host: {
    class: 'border-grey-300 flex justify-between border px-2 py-1',
  },
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  delete = output<void>();
}
