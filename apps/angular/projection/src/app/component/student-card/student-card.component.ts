import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CardViewModel } from './../../model/card.model';

@Component({
  standalone: true,
  selector: 'app-student-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, AsyncPipe, ListItemComponent],
  template: `
    <app-card class="bg-light-green" [list]="datasource$ | async" (add)="add()">
      <img src="assets/img/student.webp" width="200px" />
      <ng-template #rowRef let-student>
        <app-list-item (delete)="delete(student.id)">
          {{ student.firstname }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
})
export class StudentCardComponent implements OnInit, CardViewModel<Student> {
  datasource$ = this.store.students$;

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  add(): void {
    this.store.addOne(randStudent());
  }
  delete(id: number): void {
    this.store.deleteOne(id);
  }
}
