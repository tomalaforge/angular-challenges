import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { ObjectCard } from '../../model/object-card';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="objectsList"
      [deleteService]="store"
      [iconPath]="iconPath"
      [backGroundColor]="backGroundColor"
      (objectAdded)="addObject()"></app-card>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit, ObjectCard<Teacher> {
  objectsList: Teacher[] = [];
  cardType = CardType.TEACHER;
  iconPath = 'assets/img/teacher.png';
  backGroundColor = 'rgba(250, 0, 0, 0.1)';

  constructor(
    private http: FakeHttpService,
    public store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.objectsList = t));
  }

  addObject(): void {
    this.store.addOne(randTeacher());
  }
}
