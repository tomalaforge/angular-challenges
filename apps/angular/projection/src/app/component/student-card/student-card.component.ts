import { Component, OnInit, inject } from '@angular/core';
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
      customClass="bg-light-green"
      (addNewItem)="store.addOne(randStudent())"
      (itemDelete)="store.deleteOne($event)">
      <img src="assets/img/student.webp" width="200px" />
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  randStudent = randStudent;

  private http = inject(FakeHttpService);
  protected store = inject(StudentStore);

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }
}
