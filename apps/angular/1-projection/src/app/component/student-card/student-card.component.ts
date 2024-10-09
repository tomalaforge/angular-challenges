import { Component, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardItemDirective } from '../../ui/card/card-item.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" class="bg-light-green" (add)="add()">
      <img src="assets/img/student.webp" width="200px" />
      <app-list-item *app-card-item="let student" (delete)="delete(student.id)">
        {{ student.firstName }} {{ student.lastName }}
      </app-list-item>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, CardItemDirective],
})
export class StudentCardComponent implements OnInit {
  students = toSignal(this.store.students$, {
    initialValue: [],
  });

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }
  add() {
    this.store.addOne(randStudent());
  }
  delete(id: number) {
    this.store.deleteOne(id);
  }
}
