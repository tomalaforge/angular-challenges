import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardListContentDefDirective } from '../../ui/card/card-list-content-def.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `<app-card [list]="students$ | async" (add)="addStudent()" #card>
    <img src="assets/img/student.webp" width="200px" />
    <app-list-item
      *cardListContentDef="let student; list: card.list"
      [id]="student.id"
      (delete)="deleteStudent($event)">
      {{ student.firstname }}
    </app-list-item>
  </app-card>`,
  standalone: true,
  styles: [
    `
      app-card {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    AsyncPipe,
    ListItemComponent,
    CardListContentDefDirective,
  ],
})
export class StudentCardComponent implements OnInit {
  students$ = this.store.students$;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addStudent() {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
