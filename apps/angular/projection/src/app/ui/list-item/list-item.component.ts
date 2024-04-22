import { Component, Input } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      {{ name }}
      <button (click)="delete(id)">
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

  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore,
    private cityStore: CityStore,
  ) {}

  delete(id: number) {
    switch (this.type) {
      case CardType.TEACHER:
        return this.teacherStore.deleteOne(id);
      case CardType.STUDENT:
        return this.studentStore.deleteOne(id);
      case CardType.CITY:
        return this.cityStore.deleteOne(id);
      default:
        return;
    }
  }
}
