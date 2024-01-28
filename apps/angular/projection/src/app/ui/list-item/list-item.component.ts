import { Component, EventEmitter, Output, input } from '@angular/core';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      <ng-content></ng-content>
      <button (click)="delete.emit(id())">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  id = input<number>();
  @Output() delete = new EventEmitter<number>();

  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore,
  ) {}
}
