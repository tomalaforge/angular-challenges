import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border border-grey-300 py-1 px-2 flex justify-between">
      {{ name }}
      <button (click)="delete()">
        <img class="h-5" src="/assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  @Input() id!: number;
  @Input() name!: string;
  @Output() deleteEvent = new EventEmitter<number>();

  delete() {
    this.deleteEvent.emit(this.id);
  }
}
