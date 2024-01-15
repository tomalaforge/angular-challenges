import { Component, inject } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CardListItemDirective } from '../../ui/card/card-list-item.directive';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      class="bg-light-red"
      (addedItem)="addNewTeacher()">
      <img image src="assets/img/teacher.png" width="200px" />
      <ng-template appCardListItem let-item>
        <app-list-item (deletedItem)="deleteTeacher(item.id)">
          <div description>
            {{ item.firstname }}
          </div>
        </app-list-item></ng-template
      ></app-card
    >
  `,
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

  teachers = toSignal(
    this.http.fetchTeachers$.pipe(
      tap((teachers) => {
        this.store.addAll(teachers);
      }),
      switchMap(() => {
        return this.store.teachers$;
      })
    ),
    { initialValue: [] as Teacher[] }
  );

  addNewTeacher(): void {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
