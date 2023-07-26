import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [list]="students"
    [addOneStore]="store.addOne.bind(store)"
    [removeStore]="store.deleteOne.bind(store)"
    [addRandom]="addRandom"
    label="firstname"
    customClass="bg-light-green"></app-card>`,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
      .bg-light-green > .imgHolder {
        content: url('./../../../assets/img/student.webp');
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [CardComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];

  http: FakeHttpService = inject(FakeHttpService);
  store: StudentStore = inject(StudentStore);
  addRandom: () => Student = randStudent;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }
}
