import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card [items]="teachers$ | async" class="bg-light-red">
    <img cardImage src="assets/img/teacher.png" width="200px" />

    <ng-template #listItemRef let-teacher>
      <app-list-item (deleteEvent)="deleteTeacher(teacher.id)">
        {{ teacher.firstname }}
      </app-list-item>
    </ng-template>

    <ng-container ngProjectAs="[actions]">
      <button
        class="p-2 bg-blue-300 border border-blue-500 rounded-sm"
        (click)="addNewTeacher()">
        Add
      </button>
    </ng-container>
  </app-card>`,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, AsyncPipe],
})
export class TeacherCardComponent implements OnInit {
  teachers$ = this.store.teachers$;

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addNewTeacher(): void {
    this.store.addOne(randTeacher());
  }

  deleteTeacher = (id: number) => {
    this.store.deleteOne(id);
  };
}
