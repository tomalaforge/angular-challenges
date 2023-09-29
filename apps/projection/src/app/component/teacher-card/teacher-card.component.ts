import { Component, inject } from '@angular/core';
import { FakeHttpService, randTeacher, } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { JsonPipe, NgIf } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-teacher-card',
  template: ` <app-card [list]="teachers() ?? []" (added)="addTeacher()">
    <img card-header src="assets/img/teacher.png" width="200px" />

    <ng-template #row let-teacher>
        <app-list-item (deleted)="deleteTeacher(teacher.id)">{{teacher.firstname}}</app-list-item>
    </ng-template>
  </app-card>`,
  styles: [
    `
        app-card {
            background-color: rgba(250, 0, 0, 0.1);
        }
    `,
  ],
  standalone: true,
  imports: [CardComponent, NgIf, JsonPipe, ListItemComponent],
})
export class TeacherCardComponent {
  readonly #store = inject(TeacherStore);
  readonly #http = inject(FakeHttpService);

  teachers = toSignal(
    this.#http.fetchTeachers$.pipe(
      tap((teachers) => this.#store.addAll(teachers)),
      switchMap(() => this.#store.teachers$)
    )
  );

  addTeacher() {
    this.#store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.#store.deleteOne(id);
  }
}
