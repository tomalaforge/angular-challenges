import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers"
      (addOneEventEmitter)="addTeacher()"
      class="bg-light-red">
      <img
        img-src
        ngSrc="assets/img/teacher.png"
        width="200"
        height="200"
        alt="teacher image" />

      <ng-template appCardListItem let-item>
        <app-list-item
          [id]="item.id"
          [name]="item.firstName"
          (deleteEventEmitter)="delete(item.id)" />
      </ng-template>
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
  imports: [
    CardComponent,
    CardListItemDirective,
    ListItemComponent,
    NgOptimizedImage,
  ],
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

  public addTeacher(): void {
    this.store.addOne(randTeacher());
  }

  public delete(id: number): void {
    this.store.deleteOne(id);
  }
}
