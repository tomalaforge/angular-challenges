import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      (itemDeleted)="onDelete($event)"
      (itemAdded)="onAdd()"
      [list]="teachers()"
      [displayNameFn]="displayNameFn"
      customClass="bg-light-red">
      <img ngSrc="assets/img/teacher.png" width="200" height="200" alt="" />
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  public store = inject(TeacherStore);

  teachers = this.store.teachers;
  cardType = CardType.TEACHER;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  displayNameFn = (teacher: Teacher) => teacher.firstName;

  onDelete(id: number) {
    this.store.deleteOne(id);
  }

  onAdd() {
    this.store.addOne(randTeacher());
  }
}
