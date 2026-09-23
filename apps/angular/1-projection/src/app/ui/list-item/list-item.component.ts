// list-item.component.ts

import { ChangeDetectionStrategy, Component, output } from '@angular/core';
// import { StudentStore } from '../../data-access/student.store';
// import { TeacherStore } from '../../data-access/teacher.store';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="flex justify-between border border-gray-300 px-2 py-1">
      <ng-content />
      <button (click)="deleted.emit()">
        <img class="h-5" src="assets/svg/trash.svg" alt="trash" />
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  // private teacherStore = inject(TeacherStore);
  // private studentStore = inject(StudentStore);

  // readonly id = input.required<number>();
  // readonly name = input.required<string>();
  // readonly type = input.required<CardType>();

  // delete(id: number) {
  //   const type = this.type();
  //   if (type === CardType.TEACHER) {
  //     this.teacherStore.deleteOne(id);
  //   } else if (type === CardType.STUDENT) {
  //     this.studentStore.deleteOne(id);
  //   }
  // }
  readonly deleted = output<void>();
}
