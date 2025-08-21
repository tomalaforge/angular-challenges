import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="flex justify-between border border-gray-300 px-2 py-1">
      {{ name() }}
      <button (click)="delete(id())">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  deleteEvent = output<number>();

  readonly id = input.required<number>();
  readonly name = input.required<string>();

  delete(id: number) {
    this.deleteEvent.emit(id);
  }
}
