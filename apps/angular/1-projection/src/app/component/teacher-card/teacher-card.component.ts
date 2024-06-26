import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { concatMap, tap } from 'rxjs';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      (addItem)="onAddItem()"
      customClass="bg-light-red">
      <ng-template #rowRef let-teacher>
        <app-list-item
          [id]="teacher.id"
          [name]="teacher.firstname"
          (deleteItem)="onDeleteItem($event)"></app-list-item>
      </ng-template>
      <img src="assets/img/teacher.png" width="200px" />
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, AsyncPipe],
})
export class TeacherCardComponent {
  private store = inject(TeacherStore);
  private http = inject(FakeHttpService);
  teachers = toSignal(
    this.http.fetchTeachers$.pipe(
      tap((teachers) => this.store.addAll(teachers)),
      concatMap(() => this.store.teachers$),
    ),
    { initialValue: null },
  );

  onAddItem() {
    this.store.addOne(randTeacher());
  }

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
