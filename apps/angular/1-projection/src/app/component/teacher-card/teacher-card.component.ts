import { Component, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardItemDirective } from '../../ui/card/card-item.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" class="bg-light-red" (add)="add()">
      <img src="assets/img/teacher.png" width="200px" />
      <app-list-item *app-card-item="let teacher" (delete)="delete(teacher.id)">
        {{ teacher.firstName }} {{ teacher.lastName }}
      </app-list-item>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, CardItemDirective],
})
export class TeacherCardComponent implements OnInit {
  teachers = toSignal(this.store.teachers$, { initialValue: [] });

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  add() {
    this.store.addOne(randTeacher());
  }
  delete(id: number) {
    this.store.deleteOne(id);
  }
}
