import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { ListItemDirective } from '../../ui/list-item/list-item.directive';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      customClass="bg-light-red"
      (addNewItem)="addNewTeacher()">
      <img ngSrc="assets/img/teacher.png" width="200" height="200" />

      <ng-template appListItem let-item>
        <app-list-item
          [name]="item.firstName"
          [id]="item.id"
          [type]="item.type" />
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    NgOptimizedImage,
    ListItemDirective,
    ListItemComponent,
  ],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;
  type = CardType.TEACHER;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addNewTeacher(): void {
    this.store.addOne(randTeacher());
  }
}
