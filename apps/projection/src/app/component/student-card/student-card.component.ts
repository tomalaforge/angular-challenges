import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { ICardComponent } from '../../model/card-component';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: ` <ng-template #studentTemplate let-item>{{
      item.firstname
    }}</ng-template>
    <app-card
      [list]="students"
      [optionTemplate]="studentTemplate"
      (addItem)="addNewItem()"
      (deleteItem)="deleteItem($event)"
      customClass="bg-light-green">
      <img src="assets/img/student.webp" width="200px" cardContent
    /></app-card>`,
  standalone: true,
  imports: [CardComponent],
})
export class StudentCardComponent implements OnInit, ICardComponent {
  students: Student[] = [];

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }

  addNewItem() {
    this.store.addOne(randStudent());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
