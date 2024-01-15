import { Component, inject } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CardListItemDirective } from '../../ui/card/card-list-item.directive';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [list]="students()"
    class="bg-light-green"
    (addedItem)="addNewStudent()">
    <img image src="assets/img/student.webp" width="200px" />
    <ng-template appCardListItem let-item>
      <app-list-item (deletedItem)="deleteStudent(item.id)">
        <div description>
          {{ item.firstname }}
        </div>
      </app-list-item></ng-template
    ></app-card
  > `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, CardListItemDirective],
})
export class StudentCardComponent {
  http = inject(FakeHttpService);
  store = inject(StudentStore);

  students = toSignal(
    this.http.fetchStudents$.pipe(
      tap((students) => {
        this.store.addAll(students);
      }),
      switchMap(() => {
        return this.store.students$;
      })
    ),
    { initialValue: [] as Student[] }
  );

  addNewStudent(): void {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
