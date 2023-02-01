import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import {
  CardComponent,
  CardImageDirective,
  CardListDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <card
      class="bg-light-red"
      [list]="teachers$ | async"
      (addItem)="addTeacher()">
      <card-image>
        <img src="assets/img/teacher.png" width="200px" />
      </card-image>

      <ng-template card-list let-item>
        <list-item (delete)="deleteTeacher($event)" [id]="item?.id">
          {{ item?.firstname }}
        </list-item>
      </ng-template>
    </card>
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
    AsyncPipe,
    ListItemComponent,
    CardImageDirective,
    CardListDirective,
  ],
})
export class TeacherCardComponent implements OnInit {
  teachers$ = this.store.teachers$;

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addTeacher(): void {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number): void {
    this.store.deleteOne(id);
  }
}
