import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    {{ name }}
    <button (click)="delete(id)">
      <img class="h-5" src="assets/svg/trash.svg" />
    </button>
  `,
  standalone: true,
  host: {
    class: 'border-grey-300 flex justify-between border px-2 py-1',
  },
})
export class ListItemComponent {
  @Input() id!: number;
  @Input() name!: string;

  @Output() deleteEvent = new EventEmitter<number>();

  delete(id: number) {
    this.deleteEvent.emit(id);
  }
}
