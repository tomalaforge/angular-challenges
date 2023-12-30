import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students" customClass="bg-light-green">
      <img src="assets/img/student.webp" width="200px" image />

      <ng-template cardListItem let-student>
        <app-list-item
          [name]="student.firstName"
          [id]="student.id"
          (deleteItem)="onDeleteItem($event)"></app-list-item>
      </ng-template>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, CardListItemDirective],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];

  constructor(
    private http: FakeHttpService,
    private studentStore: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.studentStore.addAll(s));

    this.studentStore.students$.subscribe((s) => (this.students = s));
  }

  addNewItem() {
    this.studentStore.addOne(randStudent());
  }

  onDeleteItem(id: number) {
    this.studentStore.deleteOne(id);
  }
}
