import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';

@Component({
  selector: 'app-list-item',
  template: `
    <!-- <ng-template #appListItemTemplate let-item="item"> -->
    <div class="border border-grey-300 py-1 px-2 flex justify-between">
      {{ name }}
      <button (click)="delete(id)">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
    <!-- </ng-template> -->
  `,
  standalone: true,
})
export class ListItemComponent {
  @Input() id!: number;
  @Input() name!: string;
  @Input() type!: CardType;
  @Output() deleteEvent = new EventEmitter<number>();

  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore
  ) {}

  delete(id: number) {
    this.deleteEvent.emit(id);
  }
}
