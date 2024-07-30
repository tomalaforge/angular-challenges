import { Component, inject, OnInit } from '@angular/core';
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
      [list]="students"
      [imgTemplate]="studentImg"
      [itemTemplate]="studentItem"
      [actionTemplate]="studentAction"></app-card>
    <ng-template #studentImg>
      <img src="assets/img/student.webp" width="200px" />
    </ng-template>
    <ng-template let-item #studentItem>
      <app-list-item
        [name]="item.firstName"
        [id]="item.id"
        (deleteItemEvent)="deleteItem($event)"></app-list-item>
    </ng-template>
    <ng-template #studentAction>
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </ng-template>
  `,
  standalone: true,
  styles: [
    `
      app-card {
        --bgColor: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  http = inject(FakeHttpService);
  store = inject(StudentStore);

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
