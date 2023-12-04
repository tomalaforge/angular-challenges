import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [list]="students()"
    (addNewItem)="addStudent()"
    class="bg-light-red">
    <img img-header src="assets/img/student.webp" width="200px" />

    <ng-template let-student itemList>
      <app-list-item (deleteItem)="deleteStuden(student.id)">
        {{ student.firstname }} {{ student.lastname }}</app-list-item
      >
    </ng-template>
  </app-card>`,

  standalone: true,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, CardListItemDirective],
})
export class StudentCardComponent {
  http: FakeHttpService = inject(FakeHttpService);
  store: StudentStore = inject(StudentStore);

  students = toSignal(
    this.http.fetchStudents$.pipe(
      tap((students) => this.store.addAll(students)),
      switchMap(() => this.store.students$),
    ),
    { initialValue: [] as Student[] },
  );

  addStudent() {
    this.store.addOne(randStudent());
  }

  deleteStuden(id: number) {
    this.store.deleteOne(id);
  }
}
