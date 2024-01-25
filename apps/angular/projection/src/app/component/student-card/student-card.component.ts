import { Component, OnInit, signal, WritableSignal } from '@angular/core';
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
      customClass="bg-light-green"
      (AddNewRecordEmitter)="handleAddNewStudent()"
      [ListItemTemplate]="itemTemplate">
      <img src="assets/img/student.webp" width="200px" image />
      <ng-template #itemTemplate let-item>
        <app-list-item
          [item]="item"
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
  students: WritableSignal<Student[]> = signal([]);

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => this.students.set(s));
  }

  handleDeleteStudent(id: number) {
    this.store.deleteOne(id);
  }

  handleAddNewStudent() {
    this.store.addOne(randStudent());
  }
}
