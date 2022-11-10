import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border border-grey-300 py-1 px-2 flex justify-between">
      {{ name }}
      <button (click)="deleteItem()">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ListItemComponent {
  @Input() name!: string;

  @Output() delete = new EventEmitter<void>();

  deleteItem() {
    this.delete.emit();
  }
}
