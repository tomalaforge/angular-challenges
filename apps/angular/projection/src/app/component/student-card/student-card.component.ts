import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `<app-card [list]="students | async" class="bg-light-green">
    <img src="assets/img/student.webp" width="200px" />
    <ng-template #rowRef let-student>
      <app-list-item (delete)="deleteStudent(student.id)">
        {{ student.firstname }}
      </app-list-item>
    </ng-template>
    <button
      class="border border-red-500 bg-red-300 p-2 rounded-sm"
      (click)="addNewItem()">
      Add
    </button>
  </app-card>`,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, ListItemComponent, AsyncPipe],
})
export class StudentCardComponent implements OnInit {
  students: Observable<Student[]> = this.store.students$;

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addNewItem() {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
