import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { concatMap, tap } from 'rxjs';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { ListItem } from '../../ui/list-item/list-item.directive';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      customClass="bg-light-green"
      (addItem)="addNewItem()">
      <img src="assets/img/student.webp" width="200px" />
      <ng-template listItem let-student>
        <app-list-item
          [id]="student.id"
          [name]="student.firstname"
          (deleteItem)="deleteItem($event)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, AsyncPipe, ListItem],
})
export class StudentCardComponent {
  private store = inject(StudentStore);
  private http = inject(FakeHttpService);
  students = toSignal(
    this.http.fetchStudents$.pipe(
      tap((students) => this.store.addAll(students)),
      concatMap(() => this.store.students$),
    ),
    { initialValue: null },
  );

  addNewItem() {
    this.store.addOne(randStudent());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
