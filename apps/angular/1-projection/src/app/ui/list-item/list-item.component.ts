import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      {{ name }}
      <button (click)="onDeleteItem(id)">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  @Input() id!: number;
  @Input() name!: string;
  @Input() type!: CardType;
  @Output() deleteItem = new EventEmitter<number>();

  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore,
  ) {}

  onDeleteItem(id: number) {
    this.deleteItem.emit(id);
  }
}
