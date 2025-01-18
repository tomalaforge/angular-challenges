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
      [getListItemName]="getListItemName"
      class="bg-light-red"
      (addNewItemEvent)="handleAddNewItemEvent()"
      (deleteItemEvent)="handleDeleteItemEvent($event)">
      <div card-img>
        <img src="assets/img/teacher.png" width="200px" />
      </div>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  getListItemName = (teacher: Teacher) => teacher.firstName;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  handleAddNewItemEvent() {
    this.store.addOne(randTeacher());
  }

  handleDeleteItemEvent(id: number) {
    this.store.deleteOne(id);
  }
}
