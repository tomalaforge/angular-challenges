import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { templateRefDirective } from '../../directives/tempateRef.directive';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      (addItem)="addStudent()"
      class="bg-light-green">
      <img src="assets/img/student.webp" width="200px" />
      <ng-template templateRef let-student>
        <app-list-item
          [id]="student.id"
          (deleteItem)="deleteStudent(student.id)">
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
  imports: [CardComponent, ListItemComponent, templateRefDirective],
})
export class StudentCardComponent implements OnInit {
  students = signal<Student[]>([]);

  http = inject(FakeHttpService);
  storeStudents = inject(StudentStore);

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((students) =>
      this.storeStudents.addAll(students),
    );

    this.storeStudents.students$.subscribe((students) =>
      this.students.set(students),
    );
  }

  addStudent() {
    this.storeStudents.addOne(randStudent());
  }

  deleteStudent(studentId: number) {
    this.storeStudents.deleteOne(studentId);
  }
}
