import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { ObjectCard } from '../../model/object-card';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
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
export class StudentCardComponent implements OnInit, ObjectCard<Student> {
  objectsList: Student[] = [];
  cardType = CardType.STUDENT;
  iconPath = 'assets/img/student.webp';
  backGroundColor = 'rgba(0, 250, 0, 0.1)';

  constructor(
    private http: FakeHttpService,
    public store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.objectsList = s));
  }

  addObject(): void {
    this.store.addOne(randStudent());
  }
}
