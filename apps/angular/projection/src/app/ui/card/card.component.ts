import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img"></ng-content>
    <ng-content select="section"></ng-content>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addNewItem()">
      Add
    </button>
  `,
  standalone: true,
  imports: [ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'background flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
})
export class CardComponent {
  @Output() addMoreEvent = new EventEmitter<void>();

  constructor() {}

  addNewItem() {
    this.addMoreEvent.emit();
  }
}
