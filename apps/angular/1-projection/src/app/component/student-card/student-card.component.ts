import { Component, OnInit } from '@angular/core';
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
      [list]="students"
      [listTemplate]="listTemplate"
      customClass="bg-light-green">
      <img ngProjectAs="image" src="assets/img/student.webp" width="200px" />
      <button
        ngProjectAs="addBtn"
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>

    <ng-template #listTemplate let-item let-type="type">
      <app-list-item>
        {{ item.firstName }}
        <button ngProjectAs="deleteBtn" (click)="delete(item.id)">
          <img class="h-5" src="assets/svg/trash.svg" />
        </button>
      </app-list-item>
    </ng-template>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardType = CardType.STUDENT;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
    this.store.students$.subscribe((s) => (this.students = s));
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }

  addNewItem() {
    this.store.addOne(randStudent());
  }
}
