import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachers"
    itemNameKey="firstname"
    (onAddNewItem)="addNewTeacher()"
    (onDelete)="delete($event)"
    customClass="bg-light-red">
    <img src="assets/img/teacher.png" width="200px" />
  </app-card>`,
  standalone: true,
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  addNewTeacher(): void {
    this.store.addOne(randTeacher());
  }

  delete(id: number): void {
    this.store.deleteOne(id);
  }
}
