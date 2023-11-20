import { Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import { StudentStore } from '../../data-access/student.store';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { Student } from '../../model/student.model';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [list]="students()"
    class="bg-light-blue"
    (add)="addStudent()">
    <img card-header src="assets/img/student.webp" width="200px" />
    <ng-template card-list-item let-student>
      <app-list-item (deleted)="deleteStudent(student.id)">
        {{ student.firstname }}
      </app-list-item>
    </ng-template>
  </app-card>`,

  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 96, 250, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, CardListItemDirective],
})
export class StudentCardComponent {
  http = inject(FakeHttpService);
  store = inject(StudentStore);

  students: Signal<Student[]> = toSignal(
    this.http.fetchStudents$.pipe(
      tap((students: Student[]) => this.store.addAll(students)),
      switchMap(() => this.store.students$)
    ),
    {
      initialValue: [] as Student[],
    }
  );

  addStudent() {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
