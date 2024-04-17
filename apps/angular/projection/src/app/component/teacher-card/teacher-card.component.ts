import { NgOptimizedImage } from '@angular/common';
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
    <app-card
      [list]="teachers"
      [itemTemplate]="itemTemplate"
      backgroundClass="bg-red-200"
      customClass="bg-light-red"
      (clickedAdd)="addTeacher()">
      <img ngSrc="assets/img/teacher.png" width="200" height="200" priority />
    </app-card>

    <ng-template #itemTemplate let-item>
      <app-list-item
        [name]="item.firstName"
        [id]="item.id"
        (clickedRemove)="removeTeacher($event)" />
    </ng-template>
  `,
  standalone: true,
  imports: [NgOptimizedImage, CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  cardType = CardType.TEACHER;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  protected addTeacher() {
    this.store.addOne(randTeacher());
  }

  protected removeTeacher(teacherId: number) {
    this.store.deleteOne(teacherId);
  }
}
