import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
    <app-card
      [list]="students$ | async"
      (add)="addStudent()"
      class="bg-light-green">
      <img src="assets/img/student.webp" width="200px" />

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
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, AsyncPipe],
})
export class StudentCardComponent implements OnInit {
  students$: Observable<Student[]>;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {
    this.students$ = this.store.students$;
  }

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((students) =>
      this.store.addAll(students),
    );
  }

  addStudent() {
    this.store.addOne(randStudent());
  }

  deleteStudent(studentId: number): void {
    this.store.deleteOne(studentId);
  }
}
