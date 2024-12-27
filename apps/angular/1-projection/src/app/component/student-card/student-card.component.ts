import { Component, inject, OnInit, Signal } from '@angular/core';
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
      [list]="students()"
      [customClass]="'rgba(0, 250, 0, 0.1)'"
      [templateRef]="student"
      (add)="addStudent()">
      <img src="assets/img/student.webp" width="200px" />
    </app-card>

    <ng-template #student let-student>
      <app-list-item
        [name]="student.firstName"
        [id]="student.id"
        (delete)="deleteStudent(student.id)" />
    </ng-template>
  `,
  imports: [CardComponent, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  private http: FakeHttpService = inject(FakeHttpService);
  private store: StudentStore = inject(StudentStore);

  students: Signal<Student[]> = this.store.elements$;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addStudent() {
    this.store.addOne(randStudent());
  }

  deleteStudent(studentId: number) {
    this.store.deleteOne(studentId);
  }
}
