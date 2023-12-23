import { toSignal } from '@angular/core/rxjs-interop';
import { Component, inject } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent, CardListItem } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card [list]="teachers()" (added)="add()" class="bg-light-red">
    <img card-image src="assets/img/teacher.png" width="200px" />
    <ng-template card-list-item let-teacher>
      <app-list-item (delete)="delete(teacher.id)">
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
  imports: [CardComponent, CardListItem, ListItemComponent],
})
export class TeacherCardComponent {
  private http: FakeHttpService = inject(FakeHttpService);
  private store: TeacherStore = inject(TeacherStore);

  teachers = toSignal(
    this.http.fetchTeachers$.pipe(
      tap((teachers) => this.store.addAll(teachers)),
      switchMap(() => this.store.teachers$)
    ),
    {
      initialValue: [] as Teacher[],
    }
  );

  add() {
    this.store.addOne(randTeacher());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
