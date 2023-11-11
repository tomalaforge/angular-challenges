import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { Student } from '../../model/student.model';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [list]="students()"
    (addItem)="addStudent()"
    (deleteItem)="removeStudent($event)"
    customClass="bg-light-green">
    <img src="assets/img/student.webp" width="200px" />
    <ng-template let-item="item">
      {{ item.firstname }}
    </ng-template>
  </app-card>`,
  standalone: true,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  students = toSignal<Student[], Student[]>(this.store.data$, {
    initialValue: [],
  });

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addStudent() {
    this.store.addOne(randStudent());
  }

  removeStudent(id: number) {
    this.store.deleteOne(id);
  }
}
