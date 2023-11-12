import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';

@Component({
  selector: 'app-list-item',
  template: `
    <ng-content />
    <button (click)="delete.emit()">
      <img class="h-5" src="assets/svg/trash.svg" />
    </button>
  `,
  standalone: true,
  host: {
    class: 'border border-grey-300 py-1 px-2 flex justify-between',
  },
})
export class ListItemComponent {
  @Output() delete = new EventEmitter();

  constructor() {}

  // delete(id: number) {
  //   if (this.type === CardType.TEACHER) {
  //     this.teacherStore.deleteOne(id);
  //   } else if (this.type === CardType.STUDENT) {
  //     this.studentStore.deleteOne(id);
  //   }
  // }
}
