import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Item } from '../../model/item.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [items]="teacherItems"
    customClass="bg-light-red"
    (_addNewItem)="addNewTeacher()"
    (_deleteItem)="deleteTeacher($event)">
    <img src="assets/img/teacher.png" width="200px" />
  </app-card>`,
  standalone: true,
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  teacherItems: Item[] = [];

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$
      .pipe(
        map((teachers) =>
          teachers.map(
            (t) => ({ name: `${t.lastname} ${t.firstname}`, id: t.id } as Item)
          )
        )
      )
      .subscribe((items) => (this.teacherItems = items));
  }

  addNewTeacher(): void {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number): void {
    this.store.deleteOne(id);
  }
}
