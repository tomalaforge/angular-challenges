import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    {{ name() }}
    <button (click)="delete(id())">
      <img class="h-5" src="assets/svg/trash.svg" />
    </button>
  `,
  host: {
    class: 'border-grey-300 flex justify-between border gap-2 px-4 py-2',
  },
  standalone: true,
})
export class ListItemComponent {
  id = input.required<number>();
  name = input.required<string>();
  deleteItem = output<number>();

  delete(id: number) {
    this.deleteItem.emit(id);
  }
}
