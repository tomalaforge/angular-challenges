import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers$ | async"
      (add)="addTeacher()"
      class="bg-light-red">
      <img src="assets/img/teacher.png" width="200px" />

      <ng-template #rowRef let-teacher>
        <app-list-item (delete)="deleteTeacher(teacher.id)">
          {{ teacher.firstName }}
        </app-list-item>
      </ng-template>
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
  imports: [CardComponent, ListItemComponent, AsyncPipe],
})
export class TeacherCardComponent implements OnInit {
  teachers$: Observable<Teacher[]>;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {
    this.teachers$ = this.store.teachers$;
  }

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((teachers) =>
      this.store.addAll(teachers),
    );
  }

  addTeacher(): void {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(teacherId: number): void {
    this.store.deleteOne(teacherId);
  }
}
