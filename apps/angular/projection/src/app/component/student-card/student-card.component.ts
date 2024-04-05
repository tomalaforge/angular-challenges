import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Card } from '../../model/card';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card class="bg-light-green" (addMoreEvent)="addOne()">
      <img src="assets/img/student.webp" width="200px" />
      <section>
        @for (item of students; track item.id) {
          <app-list-item
            (deleteEvent)="removeOne($event)"
            [name]="item.firstName"
            [id]="item.id"></app-list-item>
        }
      </section>
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
export class StudentCardComponent implements OnInit, Card {
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

  removeOne(id: number) {
    this.store.deleteOne(id);
  }
}
