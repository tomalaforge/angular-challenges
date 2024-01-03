import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      customClass="bg-light-green"
      [list]="students()"
      (addItem)="addNewItem()">
      <img src="assets/img/student.webp" width="200px" image />

      <ng-template cardListItem let-student>
        <app-list-item (deleteItem)="onDeleteItem(student.id)">
          <p>{{ student.firstName }}</p>
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, CardListItemDirective],
})
export class StudentCardComponent implements OnInit {
  students = this.studentStore.students;

  constructor(
    private http: FakeHttpService,
    private studentStore: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.studentStore.addAll(s));
  }

  addNewItem() {
    this.studentStore.addOne(randStudent());
  }

  onDeleteItem(id: number) {
    this.studentStore.deleteOne(id);
  }
}
