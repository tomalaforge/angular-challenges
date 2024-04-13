import { Component, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
      [list]="students()"
      [type]="cardType"
      (add)="addNew()"
      customClass="bg-light-red">
      <img
        src="assets/img/student.webp"
        alt="Placeholder for the student card"
        width="200px" />

      <ng-template #rowRef let-student>
        <app-list-item (delete)="deleteStudent(student.id)">
          {{ student.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [],
  imports: [CardComponent, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  students = toSignal<Student[]>(this.store.students$);
  cardType = CardType.STUDENT;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }
  addNew() {
    this.store.addOne(randStudent());
  }
  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
