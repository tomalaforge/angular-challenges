import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardListContentDefDirective } from '../../ui/card/card-list-content-def.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card [list]="teachers$ | async" (add)="addTeacher()" #card>
    <img src="assets/img/teacher.png" width="200px" />
    <app-list-item
      *cardListContentDef="let teacher; list: card.list"
      [id]="teacher.id"
      (delete)="deleteTeacher($event)">
      {{ teacher.firstname }}
    </app-list-item>
  </app-card>`,
  styles: [
    `
      app-card {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [
    CardComponent,
    AsyncPipe,
    CardListContentDefDirective,
    ListItemComponent,
  ],
})
export class TeacherCardComponent implements OnInit {
  teachers$ = this.store.teachers$;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
