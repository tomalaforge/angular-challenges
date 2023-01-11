import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      *ngIf="teachersItems$ | async as items"
      [list]="items"
      name-property="firstname"
      customClass="bg-light-red"
      image="assets/img/teacher.png"
      (delete)="onDelete($event)"
      (add)="onAdd()"></app-card>
  `,

  styles: [
    `
      app-card::part(card) {
        background-color: green;
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, AsyncPipe, NgIf],
})
export class TeacherCardComponent implements OnInit {
  teachersItems$ = this.store.teachers$.pipe(
    map((teachers) =>
      teachers.map((t) => ({
        id: t.id,
        name: `${t.firstname} ${t.lastname.toUpperCase()}`,
      }))
    )
  );

  onDelete(id: number) {
    this.store.deleteOne(id);
  }

  onAdd() {
    this.store.addOne(randTeacher());
  }

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }
}
