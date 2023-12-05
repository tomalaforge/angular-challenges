import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: ` <app-card
    [list]="students()"
    customClass="bg-light-green"
    [itemRef]="studentTemplate">
    <img image src="/assets/img/student.webp" width="200px" />
    <ng-template #studentTemplate let-student>
      <app-list-item
        [id]="student.id"
        name="{{ student.firstname }}"
        (deleteEvent)="deleteStudent(student.id)">
      </app-list-item>
    </ng-template>

    <button
      button
      class="border border-green-500 bg-green-300 p-2 rounded-sm"
      (click)="addNewStudent()">
      Add
    </button>
  </app-card>`,
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  students = this.store.students;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addNewStudent() {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
