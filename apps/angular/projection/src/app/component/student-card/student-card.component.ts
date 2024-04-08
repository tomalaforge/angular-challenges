import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students"
      [deleteItem]="deleteItem"
      [addNewItem]="addNewItem"
      [getName]="getName"
      customClass="bg-light-green">
      <ng-container ngProjectAs="[image]">
        <img src="assets/img/student.webp" width="200px" />
      </ng-container>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      :host ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
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

  deleteItem = (id: number) => {
    this.store.deleteOne(id);
  };

  addNewItem = () => {
    this.store.addOne(randStudent());
  };

  getName = (c: Student) => c.firstName;
}
