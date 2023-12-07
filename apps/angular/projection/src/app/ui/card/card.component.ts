import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  randStudent,
  randTeacher,
  randomCity,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { ListItem } from '../../model/listItem.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent],
})
export class CardComponent implements OnInit {
  @Input() type!: CardType;
  @Input() list: ListItem[] | null = null;
  @Input() color = '';

  CardType = CardType;
  imageUrl = '';

  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore,
    private cityStore: CityStore,
  ) {}

  ngOnInit(): void {
    if (this.type === CardType.TEACHER) {
      this.imageUrl = 'assets/img/teacher.png';
    } else if (this.type === CardType.STUDENT) {
      this.imageUrl = 'assets/img/student.png';
    } else if (this.type === CardType.CITY) {
      this.imageUrl = 'assets/img/city.png';
    }
  }

  addNewItem() {
    if (this.type === CardType.TEACHER) {
      this.teacherStore.addOne(randTeacher());
    } else if (this.type === CardType.STUDENT) {
      this.studentStore.addOne(randStudent());
    } else if (this.type === CardType.CITY) {
      this.cityStore.addOne(randomCity());
    }
  }
}
