import { NgOptimizedImage } from '@angular/common';
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
    <app-card
      [list]="students"
      (addOneEventEmitter)="addStudent()"
      class="bg-light-green">
      <img
        img-src
        ngSrc="assets/img/student.webp"
        width="200"
        height="200"
        alt="student image" />
      <ng-template appCardListItem let-item>
        <app-list-item
          [id]="item.id"
          [name]="item.firstName"
          (deleteEventEmitter)="delete(item.id)" />
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],

  imports: [
    CardComponent,
    ListItemComponent,
    CardListItemDirective,
    NgOptimizedImage,
  ],
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

  public addStudent(): void {
    this.store.addOne(randStudent());
  }

  public delete(id: number): void {
    this.store.deleteOne(id);
  }
}
