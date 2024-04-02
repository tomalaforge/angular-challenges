import { Injectable } from '@angular/core';
import { CityStore } from '../data-access/city.store';
import {
  randomCity,
  randStudent,
  randTeacher,
} from '../data-access/fake-http.service';
import { StudentStore } from '../data-access/student.store';
import { TeacherStore } from '../data-access/teacher.store';
import { CardType } from '../model/card.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore,
    private cityStore: CityStore,
  ) {}

  addOne(type: CardType) {
    if (type === CardType.TEACHER) {
      this.teacherStore.addOne(randTeacher());
    } else if (type === CardType.STUDENT) {
      this.studentStore.addOne(randStudent());
    } else if (type === CardType.CITY) {
      this.cityStore.addOne(randomCity());
    }
  }
}
