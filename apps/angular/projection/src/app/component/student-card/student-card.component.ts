import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [getName]="getStudentName"
    [store]="store"
    [list]="students"
    customClass="bg-light-green">
    <img src="assets/img/student.webp" width="200px" />
  </app-card>`,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
  encapsulation: ViewEncapsulation.None,
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];

  constructor(private http: FakeHttpService, public store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }

  getStudentName(student: Student) {
    return student.firstname;
  }
}
