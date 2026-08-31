import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="flex justify-between border border-gray-300 px-2 py-1">
      {{ name() }}
      <button (click)="onDeleteItem(id())">
        <img class="h-5" src="assets/svg/trash.svg" alt="trash" />
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  public deleteItem: OutputEmitterRef<number> = output<number>();

  readonly id: InputSignal<number> = input.required<number>();
  readonly name: InputSignal<string> = input.required<string>();

  public onDeleteItem(id: number): void {
    this.deleteItem.emit(id);
  }
}
