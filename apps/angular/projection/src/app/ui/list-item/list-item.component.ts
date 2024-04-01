import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      {{ name }}
      <button (click)="deleteEventEmitter.emit(id)">
        <img class="h-5" src="assets/svg/trash.svg" alt="trash image" />
      </button>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  @Input() id!: number;
  @Input() name!: string;
  @Output() deleteEventEmitter = new EventEmitter<number>();
}
