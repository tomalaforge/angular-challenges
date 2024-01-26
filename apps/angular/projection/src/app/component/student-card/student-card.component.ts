import { Component, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      customClass="bg-light-green"
      (AddNewRecordEmitter)="handleAddNewStudent()">
      <img src="assets/img/student.webp" width="200px" image />
      <ng-template #itemTemplate let-item>
        <app-list-item
          [id]="item.id"
          (DeleteNewRecordEmitter)="handleDeleteStudent($event)">
          <p>{{ item.firstName }} {{ item.lastName }}</p>
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [],
  imports: [CardComponent, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  students: Signal<Student[]> = signal([]);

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
    this.students = this.store.cities
  }

  handleDeleteStudent(id: number) {
    this.store.deleteOne(id);
  }

  handleAddNewStudent() {
    this.store.addOne(randStudent());
  }
}
