import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      [cardImgSrc]="'assets/img/teacher.png'"
      (delete)="delete($event)"
      (addNewItem)="addNewItem()"
      customClass="bg-light-red"></app-card>
  `,
  imports: [CardComponent],
})
export class TeacherCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;

  fetchTeachers = rxResource<Teacher[], string | undefined>({
    loader: () =>
      this.http.fetchTeachers$.pipe(tap((t) => this.store.addAll(t))),
  });

  addNewItem() {
    this.store.addOne(randTeacher());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
