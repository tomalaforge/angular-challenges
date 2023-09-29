import { Component, inject } from '@angular/core';
import { FakeHttpService, randStudent, } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-student-card',
  template: `
      <app-card
          [list]="students() ?? []"
          label="firstname"
          (added)="addStudent()">
          <img card-header src="assets/img/student.webp" width="200px"/>

          <ng-template #row let-student>
              <app-list-item (deleted)="deleteStudent(student.id)">{{student.firstname}}</app-list-item>
          </ng-template>
      </app-card>`,
  standalone: true,
  styles: [
    `
      app-card {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, JsonPipe, ListItemComponent],
})
export class StudentCardComponent {
  readonly #http = inject(FakeHttpService);
  readonly #store = inject(StudentStore);

  students = toSignal(
    this.#http.fetchStudents$.pipe(
      tap((students) => this.#store.addAll(students)),
      switchMap(() => this.#store.students$)
    )
  );

  addStudent() {
    this.#store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.#store.deleteOne(id);
  }
}
