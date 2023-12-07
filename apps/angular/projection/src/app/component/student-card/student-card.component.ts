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
  template: `<app-card
    [list]="students"
    (deleteBtnClicked)="deleteStudent($event)"
    customClass="bg-light-green">
    <img headerImg src="assets/img/student.webp" width="200px" />
    <button
      addNewItem
      class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
      (click)="addNewItem()">
      Add
    </button>
    <ng-template #specialTemplateRef let-item>
      <app-list-item (deleteItemClicked)="deleteStudent(item.id)">
        {{ item.firstname }}
      </app-list-item>
    </ng-template>
  </app-card> `,
  standalone: true,
  styles: [
    `
      :host {
        --bg-light-green: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }
  addNewItem(): void {
    this.store.addOne(randStudent());
  }
  deleteStudent(id: number): void {
    this.store.deleteOne(id);
  }
}
