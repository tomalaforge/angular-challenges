import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import {
  CardComponent,
  CardImageDirective,
  CardListDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <card
      [list]="students$ | async"
      (addItem)="addStudent()"
      class="bg-light-green">
      <card-image>
        <img src="assets/img/student.webp" width="200px" />
      </card-image>
      <ng-template card-list let-item>
        <list-item (delete)="deleteStudent($event)" [id]="item?.id">
          {{ item?.firstname }}
        </list-item>
      </ng-template>
    </card>
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
    AsyncPipe,
    ListItemComponent,
    CardImageDirective,
    CardListDirective,
  ],
})
export class StudentCardComponent implements OnInit {
  students$ = this.store.students$;

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addStudent(): void {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number): void {
    this.store.deleteOne(id);
  }
}
