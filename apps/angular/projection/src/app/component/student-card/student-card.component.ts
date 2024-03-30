import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';

import { ListItemDirective } from '../../ui/list-item/list-item-directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" (add)="addStudent()" class="bg-light-green">
      <img src="assets/img/student.webp" width="200px" alt="student" />
      <ng-template listItemRef let-student>
        <app-list-item (delete)="deleteStudent(student.id)">
          {{ student.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-green {
        background-color: lightpink;
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, ListItemDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private _http = inject(FakeHttpService);
  private _store = inject(StudentStore);
  students = this._store.students;

  ngOnInit(): void {
    this._http.fetchStudents$.subscribe((s) => this._store.addAll(s));
  }

  addStudent(): void {
    this._store.addOne(randStudent());
  }

  deleteStudent(id: number): void {
    this._store.deleteOne(id);
  }
}
