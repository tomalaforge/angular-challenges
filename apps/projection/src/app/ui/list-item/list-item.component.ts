import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'list-item',
  template: `
    <ng-content></ng-content>
    <button (click)="delete.emit(id)">
      <img class="h-5" src="assets/svg/trash.svg" />
    </button>
  `,
  host: {
    class: 'border border-grey-300 py-1 px-2 flex justify-between',
  },
  standalone: true,
})
export class ListItemComponent {
  @Input() id!: number;

  @Output()
  delete = new EventEmitter<number>();
}
