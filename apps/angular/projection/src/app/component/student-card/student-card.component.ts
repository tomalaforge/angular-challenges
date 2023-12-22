import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      (add)="addStudent()"
      [list]="students$ | async"
      customClass="bg-light-green">
      <img width="200px" src="assets/img/student.webp" alt="student image" />

      <ng-template #rowRef let-student>
        <app-list-item (delete)="deleteStudent(student.id)">
          {{ student.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, AsyncPipe],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardType = CardType.STUDENT;

  students$ = this.studentStore.students$;

  constructor(
    private http: FakeHttpService,
    private studentStore: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.studentStore.addAll(s));

    this.studentStore.students$.subscribe((s) => (this.students = s));
  }

  addStudent() {
    this.studentStore.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.studentStore.deleteOne(id);
  }
}
