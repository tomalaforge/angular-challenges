import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      {{ getName(item) }}
      <button (click)="delete(id)">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  @Input() id!: number;
  @Input() item!: any;
  @Input() deleteItem!: (id: number) => void;
  @Input() getName!: (item: any) => string;

  delete(id: number) {
    this.deleteItem(id);
  }

  name(item: any) {
    this.getName(item);
  }
}
