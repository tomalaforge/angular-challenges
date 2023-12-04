import { Component, inject } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-teacher-card',
  template: ` <app-card
    [list]="teachers()"
    (addNewItem)="addTeacher()"
    class="bg-light-green">
    <img img-header src="assets/img/teacher.png" width="200px" />

    <ng-template let-teacher itemList>
      <app-list-item (deleteItem)="deleteTeacher(teacher.id)">
        {{ teacher.firstname }} {{ teacher.lastname }}</app-list-item
      >
    </ng-template>
  </app-card>`,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, CardListItemDirective],
})
export class TeacherCardComponent {
  http: FakeHttpService = inject(FakeHttpService);
  store: TeacherStore = inject(TeacherStore);

  teachers = toSignal(
    this.http.fetchTeachers$.pipe(
      tap((teachers) => this.store.addAll(teachers)),
      switchMap(() => this.store.teachers$),
    ),
    { initialValue: [] as Teacher[] },
  );

  addTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
