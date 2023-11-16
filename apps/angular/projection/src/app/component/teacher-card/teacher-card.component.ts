import { Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
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

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachers()"
    class="bg-light-red"
    (add)="addTeacher()">
    <img card-header src="assets/img/teacher.png" width="200px" />

    <ng-template card-list-item let-teacher>
      <app-list-item (deleted)="deleteTeacher(teacher.id)">
        {{ teacher.firstname }}
      </app-list-item>
    </ng-template>
  </app-card>`,

  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, CardListItemDirective],
})
export class TeacherCardComponent {
  http = inject(FakeHttpService);
  store = inject(TeacherStore);

  teachers: Signal<Teacher[]> = toSignal(
    this.http.fetchTeachers$.pipe(
      tap((teachers: Teacher[]) => this.store.addAll(teachers)),
      switchMap(() => this.store.teachers$)
    ),
    {
      initialValue: [] as Teacher[],
    }
  );

  addTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
