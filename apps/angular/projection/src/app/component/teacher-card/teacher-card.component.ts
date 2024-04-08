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
  template: `
    <app-card
      [list]="teachers"
      [deleteItem]="deleteItem"
      [addNewItem]="addNewItem"
      [getName]="getName"
      customClass="bg-light-red">
      <ng-container ngProjectAs="[image]">
        <img src="assets/img/teacher.png" width="200px" />
      </ng-container>
    </app-card>
  `,
  styles: [
    `
      :host ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  deleteItem = (id: number) => {
    this.store.deleteOne(id);
  };

  addNewItem = () => {
    this.store.addOne(randTeacher());
  };

  getName = (c: Teacher) => c.firstName;
}
