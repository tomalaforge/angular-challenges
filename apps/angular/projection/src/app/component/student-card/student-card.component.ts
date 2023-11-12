import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [list]="students"
    [deleteCallback]="deleteStudent"
    customClass="bg-light-green">
    <img cardImage src="assets/img/student.webp" width="200px" />

    <ng-container ngProjectAs="[actions]">
      <button
        class="p-2 bg-blue-300 border border-blue-500 rounded-sm"
        (click)="addNewStudent()">
        Add
      </button>
    </ng-container>
  </app-card>`,
  standalone: true,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardType = CardType.STUDENT;

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }

  addNewStudent = () => {
    this.store.addOne(randStudent());
  };

  deleteStudent = (id: number) => {
    this.store.deleteOne(id);
  };
}
