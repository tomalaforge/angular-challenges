import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  randStudent,
  randTeacher,
  randomCity,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';
import { CityStore } from '../../data-access/city.store';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';

  CardType = CardType;

  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore,
    private cityStore: CityStore,
  ) {}

  addNewItem() {
    if (this.type === CardType.TEACHER) {
      this.teacherStore.addOne(randTeacher());
    } else if (this.type === CardType.STUDENT) {
      this.studentStore.addOne(randStudent());
    } else {
      this.cityStore.addOne(randomCity());
    }
  }
}
