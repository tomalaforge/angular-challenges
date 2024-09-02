import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card customClass="bg-light-red" [contentTemplate]="studentTemplate">
      <img card-image [src]="teacherImage" width="200px" />
      <ng-template #studentTemplate>
        <app-list-item
          *ngFor="let item of teachers"
          [name]="item.firstName"
          (deleteEvent)="delete(item.id)"></app-list-item>
      </ng-template>
      <button
        card-button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewTeacher()">
        Add
      </button>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [NgFor, CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  cardType = CardType.TEACHER;
  teacherImage = 'assets/img/teacher.png';

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  addNewTeacher() {
    this.store.addOne(randTeacher());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
