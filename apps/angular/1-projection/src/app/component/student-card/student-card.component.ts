import { Component, OnInit } from '@angular/core';
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
  template: ` <app-card
    [list]="students"
    customClass="bg-light-green"
    (addItem)="addNewItem()">
    <img src="assets/img/student.webp" width="200px" />
    <ng-template #rowRef let-student>
      <app-list-item
        [id]="student.id"
        [name]="student.firstname"
        (deleteItem)="deleteItem($event)"></app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
    this.store.students$.subscribe((s) => (this.students = s));
  }

  addNewItem() {
    this.store.addOne(randStudent());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
