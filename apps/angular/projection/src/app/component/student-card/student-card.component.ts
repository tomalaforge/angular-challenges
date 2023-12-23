import { Component, inject } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent, CardListItem } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [list]="students()"
    (added)="add()"
    class="bg-light-green">
    <img card-image src="assets/img/student.webp" width="200px" />

    <ng-template card-list-item let-student>
      <app-list-item (delete)="delete(student.id)">
        {{ student.firstname }}
      </app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, CardListItem, ListItemComponent],
})
export class StudentCardComponent {
  private http: FakeHttpService = inject(FakeHttpService);
  private store: StudentStore = inject(StudentStore);

  students = toSignal(
    this.http.fetchStudents$.pipe(
      tap((students) => this.store.addAll(students)),
      switchMap(() => this.store.students$)
    ),
    {
      initialValue: [] as Student[],
    }
  );

  add() {
    this.store.addOne(randStudent());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
