import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card customClass="bg-light-green" (addMoreEvent)="addOne()">
      <img src="assets/img/student.webp" width="200px" />
      <app-list-item
        (deleteEvent)="remove($event)"
        *ngFor="let item of students"
        [name]="item.firstName"
        [id]="item.id"></app-list-item>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, NgForOf],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }

  addOne() {
    this.store.addOne(randStudent());
  }

  remove(id: number) {
    this.store.deleteOne(id);
  }
}
