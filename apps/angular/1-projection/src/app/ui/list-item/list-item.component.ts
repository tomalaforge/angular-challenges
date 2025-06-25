import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardType } from '../../model/card.model';
import { CityStore } from './../../data-access/city.store';
import { StudentStore } from './../../data-access/student.store';
import { TeacherStore } from './../../data-access/teacher.store';

@Component({
  selector: 'app-list-item',
  standalone: true,
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      {{ name() }}
      <button (click)="delete(id())">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  // private teacherStore = inject(TeacherStore);
  // private studentStore = inject(StudentStore);
  // private CityStore= inject(CityStore)

  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore,
    private cityStore: CityStore,
  ) {}

  readonly id = input.required<number>();
  readonly name = input.required<string>();
  readonly type = input.required<CardType>();

  delete(id: number) {
    const type = this.type();
    if (type === CardType.TEACHER) {
      this.teacherStore.deleteOne(id);
    } else if (type === CardType.CITY) {
      this.cityStore.deleteOne(id);
    } else if (type === CardType.STUDENT) {
      this.studentStore.deleteOne(id);
    }
  }
}
