import { NgOptimizedImage } from '@angular/common';
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
import { NgTemplateListItemDirective } from '../../ui/list-item/ng-template-list-item.directive';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students"
      [itemTemplate]="itemTemplate"
      backgroundClass="bg-green-200"
      class="bg-light-green"
      (clickedAdd)="addStudent()">
      <img ngSrc="assets/img/student.webp" width="200" height="200" priority />
    </app-card>

    <ng-template listItem [infer]="students" #itemTemplate let-student>
      <app-list-item
        [name]="student.firstName"
        [id]="student.id"
        (clickedRemove)="removeStudent($event)" />
    </ng-template>
  `,
  standalone: true,
  imports: [
    NgOptimizedImage,
    CardComponent,
    ListItemComponent,
    NgTemplateListItemDirective,
  ],
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

  protected addStudent() {
    this.store.addOne(randStudent());
  }

  protected removeStudent(studentId: number) {
    this.store.deleteOne(studentId);
  }
}
