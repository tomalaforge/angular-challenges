import { NgFor } from '@angular/common';
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
    <app-card customClass="bg-light-green" [contentTemplate]="studentTemplate">
      <img card-image [src]="studentImage" width="200px" />
      <ng-template #studentTemplate>
        <app-list-item
          *ngFor="let item of students"
          [name]="item.firstName"
          (deleteEvent)="delete(item.id)"></app-list-item>
      </ng-template>
      <button
        card-button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewStudent()">
        Add
      </button>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [NgFor, CardComponent, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardType = CardType.STUDENT;
  studentImage = 'assets/img/student.webp';

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }

  addNewStudent() {
    this.store.addOne(randStudent());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
