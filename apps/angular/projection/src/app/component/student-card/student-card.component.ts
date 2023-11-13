import { Component, Signal } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { StudentStore } from '../../data-access/student.store';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { RowRefDirective } from '../../directives/rowref.directive';

@Component({
  selector: 'app-student-card',
  template: ` <app-card
    [list]="students()"
    (addItem)="add()"
    class="bg-light-green">
    <img src="assets/img/student.webp" width="200px" />
    <ng-template [rowRef] let-student>
      <app-list-item
        [name]="student.firstname"
        [id]="student.id"
        (deleteItem)="delete($event)">
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
  imports: [CardComponent, ListItemComponent, RowRefDirective],
})
export class StudentCardComponent {
  readonly students: Signal<Student[]> = toSignal(this.store.students$, {
    initialValue: [],
  });

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {
    this.http.fetchStudents$
      .pipe(takeUntilDestroyed())
      .subscribe((s) => this.store.addAll(s));
  }

  add() {
    this.store.addOne(randStudent());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
