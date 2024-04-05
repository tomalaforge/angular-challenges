import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Card } from '../../model/card';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card class="bg-light-red" (addMoreEvent)="addOne()">
      <img src="assets/img/teacher.png" width="200px" />
      <section>
        @for (item of teachers; track item.id) {
          <app-list-item
            (deleteEvent)="removeOne($event)"
            [name]="item.firstName"
            [id]="item.id"></app-list-item>
        }
      </section>
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
  imports: [CardComponent, ListItemComponent, NgForOf],
})
export class TeacherCardComponent implements OnInit, Card {
  teachers: Teacher[] = [];

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  addOne() {
    this.store.addOne(randTeacher());
  }

  removeOne(id: number) {
    this.store.deleteOne(id);
  }
}
