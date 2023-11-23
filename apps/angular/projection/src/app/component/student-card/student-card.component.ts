import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

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
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-card [list]="store.students$ | async" (add)="addStudent()">
    <img src="assets/img/student.webp" width="200px" />

    <ng-template #itemTemplate let-student>
      @if (typedStudent(student); as student) {
        <app-list-item (delete)="deleteStudent(student)">
          {{ student.firstname }}
        </app-list-item>
      }
    </ng-template>
  </app-card>`,
  styles: [
    `
      :host {
        --card-background-color: rgba(0, 255, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, CommonModule],
})
export class StudentCardComponent implements OnInit {
  constructor(
    private http: FakeHttpService,
    protected store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addStudent() {
    this.store.addOne(randStudent());
  }

  deleteStudent(student: Student) {
    this.store.deleteOne(student.id);
  }

  typedStudent(student: Student): Student {
    return student;
  }
}
