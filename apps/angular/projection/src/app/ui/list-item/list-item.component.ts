import { NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      {{ name }}
      <button (click)="delete()">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class ListItemComponent {
  @Input() id!: number;
  @Input() name!: string;
  @Output() deleteEvent = new EventEmitter<number>();

  delete() {
    this.deleteEvent.emit(this.id);
  }
}
